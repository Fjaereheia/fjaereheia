import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { ARTICLE_QUERYResult } from "sanity/types";
import { ARTICLE_QUERY } from "~/queries/article-queries";
import HeaderData from "~/components/HeaderData";

export async function loader({ params }: LoaderFunctionArgs) {
  const article = await client.fetch<ARTICLE_QUERYResult>(
    ARTICLE_QUERY,
    params
  );

  if (!article) {
    return json("Kunne ikke hente artikler", { status: 404 });
  }

  return json(article);
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
