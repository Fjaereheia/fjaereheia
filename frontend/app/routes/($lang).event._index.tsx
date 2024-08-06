import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { EVENTS_QUERYResult } from "../../sanity/types";
import Newsletter from "../components/Newsletter";
import { getEventsQuery } from "../queries/event-queries";
import { useBackgroundColor } from "../utils/backgroundColor";
import {
  QueryResponseInitial,
} from "@sanity/react-loader";
import { loadQuery } from "../../sanity/loader.server";
import { useQuery } from "../../sanity/loader";
import { useTranslation } from "~/utils/i18n";

export async function loader({ params }: LoaderFunctionArgs) {
  const query = getEventsQuery(params);
  const initial = await loadQuery<EVENTS_QUERYResult>(query, params);
  const event = initial.data;

  if (!event) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return { initial, query: query, params: params };
}

export const meta: MetaFunction<typeof loader> = ({ location }) => {
  const path = location.pathname;
  const { language } = useTranslation();

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

  return [
    { title: title },
    {
      property: "og:description",
      content: description,
    },
  ];
};

export default function Events() {
  const {
    initial,
    query,
    params: params,
  } = useLoaderData<typeof loader>() as {
    initial: QueryResponseInitial<EVENTS_QUERYResult>;
    query: string;
    params: Record<string, string>;
  };
  const { data } = useQuery<typeof initial.data>(query, params, {
    initial,
  });

  const { setColor } = useBackgroundColor();

  if (data.length == 0) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  useEffect(() => {
    setColor("bg-strongblue");
  }, [setColor]);
  const { language} = useTranslation();
  return (
    <div className="flex grow flex-col items-center text-white relative">
      <div className="flex flex-col items-center font-normal text-center gap-4 text-xl py-12 px-0">
        {data.map((event, index) => (
          <div key={index}>
            <Link
              key={event._id}
              to={
                event.slug?.current
                  ? `${language === "en" ? "/en/event/" : "/event/"}${
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
