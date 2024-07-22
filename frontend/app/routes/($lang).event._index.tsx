import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { EVENTS_QUERYResult } from "sanity/types";
import Newsletter from "~/components/Newsletter";
import { getEvents } from "~/queries/event-queries";
import { useBackgroundColor } from "~/utils/backgroundColor";

export async function loader({ params }: LoaderFunctionArgs) {
  const events = await getEvents(params);

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
  const { setColor } = useBackgroundColor();
  useEffect(() => {
    setColor("bg-newsletter");
  }, [setColor]);

  return (
    <div className="grid grid-flow-row min-h-screen place-items-center text-white">
      {data.map((event, index) => (
        <div key={index}>
          <Link key={event._id} to={event.slug?.current ?? ""}>
            <p className="text-center p-4 hover:underline font-serif text-2xl lg:text-4xl">
              {event.title}
            </p>
          </Link>
        </div>
      ))}
      <div className="grid place-items-center text-lg lg:text-xl w-4/5 lg:w-2/3 ">
        <Newsletter />
      </div>
    </div>
  );
}
