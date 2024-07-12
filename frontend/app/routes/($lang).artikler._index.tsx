import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ARTICLES_QUERYResult } from "sanity/types";
import { getArticles } from "~/queries/article-queries";
import ButtonLink from "~/components/ButtonLink";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.lang) {
    params = { lang: "nb" };
  }

  const articles = await getArticles(params as { lang: string });

  if (!articles) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json(articles);
}
export const meta: MetaFunction = () => {
  return [
    { title: "Artikler" },
    {
      property: "og:description",
      content: "Oversikt over artikler",
    },
  ];
};

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
    </div>
  );
}
