import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useQuery } from "@sanity/react-loader";
import { useEffect } from "react";
import { loadQuery } from "sanity/loader.server";
import { EVENTS_QUERYResult } from "sanity/types";
import Newsletter from "~/components/Newsletter";
import { EVENTS_QUERY } from "~/queries/event-queries";
import { useBackgroundColor } from "~/utils/backgroundColor";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.lang) {
    params = { lang: "nb" };
  }

  const events = await loadQuery<EVENTS_QUERYResult>(EVENTS_QUERY, params);

  if (!events) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json({
    params,
    initial: events,
  });
};

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
  const { initial, params } = useLoaderData<typeof loader>();

  const { data, loading } = useQuery<typeof initial.data>(
    EVENTS_QUERY,
    params,
    {
      initial,
    }
  );

  useEffect(() => {
    console.log("data - event flere", data);
  }, [data]);

  const { setColor } = useBackgroundColor();
  useEffect(() => {
    setColor("bg-newsletter");
  }, [setColor]);

  if (loading && !data) {
    return <div>Loading preview...</div>;
  }

  return (
    <div className="flex grow flex-col items-center text-white relative">
      <div className="flex flex-col items-center font-normal gap-4 text-xl py-12 px-0">
        {data.map((event, index) => (
          <div key={index}>
            <Link
              key={event._id}
              to={
                event.slug?.current
                  ? `${params.lang === "en" ? "/en/event/" : "/event/"}${
                      event.slug.current
                    }`
                  : ""
              }
            >
              <p className="text-center p-4 hover:underline font-serif text-2xl lg:text-4xl">
                {event.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-auto flex flex-col items-center text-lg lg:text-xl w-4/5 lg:w-2/3">
        <Newsletter />
      </div>
    </div>
  );
}
