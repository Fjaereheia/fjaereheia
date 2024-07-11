import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { EVENTS_QUERYResult } from "sanity/types";
import { EVENTS_QUERY } from "~/queries/event-queries";
import ButtonLink from "~/components/ButtonLink";
import Newsletter from "~/components/Newsletter";
import { createTexts, useTranslation } from "~/utils/i18n";

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
  const { t } = useTranslation();
  return [
    { title: t(texts.metaTitle) },
    {
      property: "og:description",
      content: t(texts.metaContent),
    },
  ];
};

export default function Events() {
  const data = useLoaderData<typeof loader>() as EVENTS_QUERYResult;

  return (
    <div className="bg-newsletter h-[80vh] lg:h-[85vh] flex flex-col items-center text-white relative">
      <div className="absolute pt-[151px] text-center ">
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
      <div className="absolute bottom-0 text-lg lg:text-xl w-4/5 lg:w-2/3 ">
        <Newsletter />
      </div>
    </div>
  );
}

const texts = createTexts({
  metaTitle: {
    nb: "Forestillinger",
    en: "Events",
  },
  metaContent: {
    nb: "Oversikt over forestillinger satt opp  av Bruddet",
    en: "Program with events shown in Bruddet",
  },
});
