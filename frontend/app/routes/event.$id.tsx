import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { EVENT_QUERYResult } from "sanity/types";
import { EVENT_QUERY } from "~/queries/event-queries";
import urlFor from "app/functions/imageUrlBuilder";


export async function loader({ params }: LoaderFunctionArgs) {
  const event = await client.fetch<EVENT_QUERYResult>(EVENT_QUERY, params);

  if (!event) {
    return json("Kunne ikke finne forestilling", { status: 404 });
  }

  return json(event);
}

export default function Event() {
  const data = useLoaderData<typeof loader>() as EVENT_QUERYResult;
  console.log(data[0].image?.asset?._ref);

  return (
    <div>
      <h1>Forestilling:</h1>
      {data.map((e, index) => (
        <div key={index}>
          <h2>{e.title}</h2>
          {e.image?.asset?._ref ? (
            <img src={urlFor(e.image.asset._ref)} alt={e.title} />
          ) : (
            <p>No image available</p>
          )}
        </div>
      ))}
    </div>
  );
}
