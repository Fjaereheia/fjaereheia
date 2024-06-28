import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { client } from "sanity/clientConfig";
import { EVENTS_QUERYResult } from "sanity/types";
import { EVENTS_QUERY, EVENT_QUERY } from "~/queries/event-queries";

export async function getEventPage() {
  const events = await client.fetch<EVENTS_QUERYResult>(EVENTS_QUERY);
  return events;
}

export async function loader() {
  const events = await getEventPage();

  if (!events) {
    return json("Kunne ikke hente forestillinger", { status: 404 });
  }

  return json(events);
}

export default function EventPage() {
  const data = useLoaderData<typeof loader>() as EVENTS_QUERYResult;
  console.log(data);
  return (
    <div>
      <h1>Forestillinger</h1>
      <p>Alle forestillinger</p>
      {data.map((event, index) => (
        <div key={index}>
          <Link key={event._id} to={event.slug?.current!}>
            <h2>{event.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
