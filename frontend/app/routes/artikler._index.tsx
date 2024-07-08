import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { ARTICLES_QUERYResult } from "sanity/types";
import { ARTICLES_QUERY } from "~/queries/article-queries";
import ButtonLink from "~/components/ButtonLink";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("footer");

  return (
    <div>
      <h1>{t("articles")}</h1>
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
