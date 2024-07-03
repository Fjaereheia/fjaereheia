import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ARTICLE_QUERYResult } from "sanity/types";
import { ARTICLE_QUERY, queryById } from "~/functions/queryFunctions";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    return json("Kunne ikke hente artikkel", { status: 404 });
  }
  const article = await queryById(ARTICLE_QUERY, params.id);

  if (!article) {
    return json("Kunne ikke hente artikkel", { status: 404 });
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
        </div>
      ))}
    </div>
  );
}
