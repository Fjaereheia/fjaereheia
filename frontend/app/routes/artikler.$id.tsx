import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { ARTICLE_QUERYResult } from "sanity/types";
import PortableTextComponent from "~/components/PortableTextComponent";
import urlFor from "~/functions/imageUrlBuilder";
import { ARTICLE_QUERY } from "~/queries/article-queries";

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
      {data.map((d) => (
        <div>
          <h1>{d.title}</h1>
          {d.image?.asset?._ref && (
            <img
              src={urlFor(d.image.asset?._ref, d.image?.hotspot)}
              alt={d.title}
            />
          )}
          {d.text && <PortableTextComponent textData={d.text} />}
        </div>
      ))}
    </div>
  );
}
