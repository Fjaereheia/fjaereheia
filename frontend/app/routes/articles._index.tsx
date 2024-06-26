import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { ARTICLES_QUERYResult } from "sanity/types";
import { ARTICLES_QUERY } from "~/queries/article-queries";

export async function getArticles() {
  const articles = await client.fetch<ARTICLES_QUERYResult>(ARTICLES_QUERY)
  return articles
}

export async function loader() {
  const articles = await getArticles()

  if(!articles){
    return json("Kunne ikke hente artikler", {status: 404});
  }

  return json(articles)
}

export default function Articles() {
  const data = useLoaderData<typeof loader>() as ARTICLES_QUERYResult;
  return (
    <div>
        <h1>Artikler</h1>
            {data.map(d => (
                <div>
                    <h2>{d.Tittel}</h2>
                </div>
            ))}
    </div>
  )
}

