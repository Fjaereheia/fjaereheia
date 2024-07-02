import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { ARTICLE_QUERYResult } from "sanity/types";
import { ARTICLE_QUERY } from "~/queries/article-queries";
import { Helmet } from "react-helmet";

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
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={data[0]?.metaDescription || ""} />
        <meta name="keywords" content={data[0]?.metaKeywords || ""} />
        <meta name="title" content={data[0]?.metaTitle || ""} />
      </Helmet>
      <div>
        <h1>Artikler</h1>
        {data.map((d, index) => (
          <div key={index}>
            <h2>{d.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
