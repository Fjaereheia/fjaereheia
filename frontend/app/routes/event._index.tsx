import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { EVENTS_QUERYResult } from "sanity/types";
import { EVENTS_QUERY } from "~/queries/event-queries";
import ButtonLink from "~/components/ButtonLink";
import StickyFooter from "~/components/StickyFooter";

export async function getEvents() {
  const events = await client.fetch<EVENTS_QUERYResult>(EVENTS_QUERY);
  return events;
}

export async function loader() {
  const events = await getEvents();

  if (!events) {
    return json("Kunne ikke hente forestillinger", { status: 404 });
  }

  return json(events);
}

export default function Events() {
  const data = useLoaderData<typeof loader>() as EVENTS_QUERYResult;
  return (
    <div>
      <h1>Program</h1>
      <p>Her er det forestillinger</p>
      {data.map((event, index) => (
        <div key={index}>
          <Link key={event._id} to={event.slug?.current!}>
            <h2 className="p-4 hover:bg-blue-50">{event.title}</h2>
          </Link>
        </div>
      ))}
      <ButtonLink url="/" buttonText="Tilbake til hovedsiden"></ButtonLink>
      <StickyFooter iUrl="/" pUrl="/event"></StickyFooter>
    </div>
  );
}
