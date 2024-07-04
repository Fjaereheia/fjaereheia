import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { ARTICLES_QUERYResult } from "sanity/types";
import { ARTICLES_QUERY } from "~/queries/article-queries";
import ButtonLink from "~/components/ButtonLink";
import StickyFooter from "~/components/StickyFooter";

export async function getArticles() {
  const articles = await client.fetch<ARTICLES_QUERYResult>(ARTICLES_QUERY);
  return articles;
}

export async function loader() {
  const articles = await getArticles();

  if (!articles) {
    return json("Kunne ikke hente artikler", { status: 404 });
  }

  return json(articles);
}

export default function Articles() {
  const data = useLoaderData<typeof loader>() as ARTICLES_QUERYResult;
  return (
    <div>
      <h1>Artikler</h1>
      <p>Her er det artikler</p>
      {data.map((article, index) => (
        <div key={index}>
          <Link key={article._id} to={article.slug?.current!}>
            <h2 className="p-4 hover:bg-blue-50">{article.title}</h2>
          </Link>
        </div>
      ))}
      <ButtonLink url="/" buttonText="Tilbake til hovedsiden"></ButtonLink>
      <StickyFooter infoUrl="/" programUrl="/event"></StickyFooter>
    </div>
  );
}
