import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { EVENT_QUERYResult } from "sanity/types";
import urlFor from "app/functions/imageUrlBuilder";
import ButtonLinkExternal from "~/components/ButtonLinkExternal";
import {
  EVENT_QUERY,
  queryById,
  queryByType,
} from "~/functions/queryFunctions";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    return json("Kunne ikke finne forestilling", { status: 404 });
  }
  const event = await queryById("event", params.id);

  if (!event) {
    return json("Kunne ikke finne forestilling", { status: 404 });
  }

  return json(event);
}

export default function Event() {
  const data = useLoaderData<typeof loader>() as EVENT_QUERYResult;

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
          {e.TicketsUrl && (
            <ButtonLinkExternal
              url={e.TicketsUrl}
              buttonText="Kjøp billetter her"
            />
          )}
        </div>
      ))}
    </div>
  );
}
