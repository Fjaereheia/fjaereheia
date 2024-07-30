import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
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

  return events;
}

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  const path = location.pathname;
  let language = "nb";
  if (path.includes("/en")) {
    language = "en";
  }
  const texts: {
    title: { [key: string]: string };
    description: { [key: string]: string };
  } = {
    title: {
      en: "Events",
      nb: "Forestillinger",
    },
    description: {
      en: "Overview of events",
      nb: "Oversikt over forestillinger",
    },
  };

  const title = texts.title[language];
  const description = texts.description[language];

  if (!data) {
    return [
      { title: title },
      {
        property: "og:description",
        content: description,
      },
    ];
  }

  return [
    { title: data.metaTitle ?? title },
    {
      property: "og:description",
      content: data.metaDescription ?? description,
    },
  ];
};

export default function Events() {
  const data = useLoaderData<typeof loader>() as EVENTS_QUERYResult;
  const { setColor } = useBackgroundColor();
  if (data.length == 0) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  useEffect(() => {
    setColor("bg-strongblue");
  }, [setColor]);
  const params = useParams();
  return (
    <div className="flex grow flex-col items-center text-white relative">
      <div className="flex flex-col items-center font-normal text-center gap-4 text-xl py-12 px-0">
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
