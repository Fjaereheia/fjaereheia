import { EVENTS_QUERY, EVENT_QUERY } from "~/queries/event-queries";
import { EVENTS_QUERYResult, EVENT_QUERYResult } from "sanity/types";
import { client } from "sanity/clientConfig";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const event = await client.fetch<EVENT_QUERYResult>(EVENT_QUERY, params);

  if (!event) {
    return json("Kunne ikke finne forestilling", { status: 404 });
  }

  return json(event);
}

export default function Events() {
  const data = useLoaderData<typeof loader>() as EVENT_QUERYResult;
  return (
    <div>
      <h1>Forestilling</h1>
      {data.map((d) => (
        <div>
          <h2>{d.title}</h2>
          <p>{d.duration}</p>
        </div>
      ))}
    </div>
  );
}
