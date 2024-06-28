import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { ARTICLE_QUERYResult, EVENTS_QUERYResult } from "sanity/types";
import { ARTICLE_QUERY } from "~/queries/article-queries";
import { EVENTS_QUERY } from "~/queries/event-queries";

export async function loader({ params }: LoaderFunctionArgs) {
  const article = await client.fetch<ARTICLE_QUERYResult>(
    ARTICLE_QUERY,
    params
  );

  if (!article) {
    return json("Kunne ikke hente artikler", { status: 404 });
  }

  const events = await client.fetch<EVENTS_QUERYResult>(EVENTS_QUERY);
  console.log(events);

  const eventsMap = Object.fromEntries(
    events.map((event) => [event._id, event])
  );
  console.log("here", eventsMap);

  const articleWithEvents: ARTICLE_QUERYResult = article.map((article) => ({
    ...article,
    event: article.event?._ref ? eventsMap[article.event._ref] : article.event,
  }));

  return json(articleWithEvents);
}

export default function Article() {
  const data = useLoaderData<typeof loader>() as ARTICLE_QUERYResult;
  return (
    <div>
      <h1>Artikler</h1>
      {data.map((d) => (
        <div>
          <h2>{d.title}</h2>
          {d.event && (
            <Link to={`/event/${d.event.slug?.current}`}>
              <h3>Les mer om forestilling</h3>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
