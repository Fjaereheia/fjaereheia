import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { ARTICLE_QUERYResult } from "sanity/types";
import PortableTextComponent from "~/components/PortableTextComponent";
import urlFor from "~/functions/imageUrlBuilder";
import { ARTICLE_QUERY } from "~/queries/article-queries";
import ButtonLink from "~/components/ButtonLink";
import PortableTextComponent from "~/components/PortableTextComponent";
import urlFor from "~/functions/imageUrlBuilder";

export async function loader({ params }: LoaderFunctionArgs) {
  const article = await client.fetch<ARTICLE_QUERYResult>(
    ARTICLE_QUERY,
    params
  );

  if (!article) {
    return json("Kunne ikke hente artikkel", { status: 404 });
  }

  return json(article);
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (typeof data === "string" || !data) {
    return [
      { title: "Artikkel" },
      {
        property: "og:description",
        content: "Artikkel",
      },
    ];
  }
  const articleData = data[0];

  return [
    { title: articleData.metaTitle ?? "Artikkel" },
    {
      property: "og:description",
      content: articleData.metaDescription ?? "Artikkel",
    },
  ];
};

export default function Article() {
  const data = useLoaderData<typeof loader>() as ARTICLE_QUERYResult;

  return (

    <div className="flex flex-col items-center mx-6 mt-">
      {data.map((article, index) => (
        <div
          className="flex flex-col items-start md:w-full lg:w-1/2"
          key={index}
        >
          <h1 className="text-4xl">{article?.title}</h1>

          {article?.image && (
            <img
              className="w-3/4 md:w-3/4 lg:w-1/2"
              src={urlFor(article.image.asset?._ref || "")}
            ></img>
          )}
          {article?.text && <PortableTextComponent textData={article.text} />}
          {article?.event && (
            <ButtonLink
              url={`/event/${article.event?.slug?.current}`}
              buttonText="Les mer om forestilling"
            />
          )}
          {d.text && <PortableTextComponent textData={d.text} />}
        </div>
      ))}
    </div>
  );
}
