import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { EVENT_QUERYResult } from "sanity/types";
import { EVENT_QUERY } from "~/queries/event-queries";
import urlFor from "app/functions/imageUrlBuilder";
import ButtonLinkExternal from "~/components/ButtonLinkExternal";
import HeaderData from "~/components/HeaderData";

export async function loader({ params }: LoaderFunctionArgs) {
  const event = await client.fetch<EVENT_QUERYResult>(EVENT_QUERY, params);

  if (!event) {
    return json("Kunne ikke finne forestilling", { status: 404 });
  }

  return json(event);
}

export default function Event() {
  const data = useLoaderData<typeof loader>() as EVENT_QUERYResult;

  return (
    <>
      <HeaderData
        description={data[0]?.metaDescription}
        title={data[0]?.metaTitle}
        lang={data[0]?.language}
      />
      <div>
        <h1>Forestilling:</h1>
        {data.map((e, index) => (
          <div key={index}>
            <h2>{e.title}</h2>
            {e.image?.asset?._ref ? (
              <img
                src={urlFor(e.image.asset._ref, e.image?.hotspot)}
                alt={e.title}
              />
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
    </>
  );
}
