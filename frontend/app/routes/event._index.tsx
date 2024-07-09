import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { EVENTS_QUERYResult } from "sanity/types";
import { EVENTS_QUERY } from "~/queries/event-queries";
import ButtonLink from "~/components/ButtonLink";
import Newsletter from "~/components/Newsletter";

export async function getEvents() {
  const events = await client.fetch<EVENTS_QUERYResult>(EVENTS_QUERY);
  return events;
}

export async function loader() {
  const events = await getEvents();

  if (!events) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json(events);
}

export const meta: MetaFunction = () => {
  return [
    { title: "Forestillinger" },
    {
      property: "og:description",
      content: "Oversikt over forestillinger",
    },
  ];
};

export default function Events() {
  const data = useLoaderData<typeof loader>() as EVENTS_QUERYResult;

  return (
    <div className="bg-newsletter min-h-screen flex flex-col items-center text-white relative">
      <div className="mt-44 text-center">
        {data.map((event, index) => (
          <div key={index}>
            <Link key={event._id} to={event.slug?.current ?? ""}>
              <p className="p-4 hover:underline font-serif text-2xl lg:text-4xl">
                {event.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute bottom-40  text-lg lg:text-xl w-2/3 ">
        <Newsletter />
      </div>

    </div>
  );
}
