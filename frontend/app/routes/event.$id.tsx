import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { EVENT_QUERYResult } from "sanity/types";
import { EVENT_QUERY } from "~/queries/event-queries";
import urlFor from "app/functions/imageUrlBuilder";
import ButtonLinkExternal from "~/components/ButtonLinkExternal";
import EventLabels from "~/components/EventLabels";
import { split } from "postcss/lib/list";
import PortableTextComponent from "~/components/PortableTextComponent";

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
      <div>
        {data.map((e, index) => (
          <div key={index}>
            {e.image?.asset?._ref ? (
              <img
                src={urlFor(e.image.asset._ref, e.image?.hotspot)}
                alt={e.title}
              />
            ) : (
              <p>No image available</p>
            )}
            <h1>{e.title}</h1>
            {e.dates && (
              <EventLabels
                dateTime={e?.dates}
                ticketUrl={e?.TicketsUrl || ""}
              />
            )}
            {e.text && <PortableTextComponent textData={e.text} />}
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
