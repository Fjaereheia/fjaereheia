import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useLocation, useParams } from "@remix-run/react";
import { ARTICLES_QUERYResult } from "sanity/types";
import { getArticles } from "~/queries/article-queries";

export async function loader({ params }: LoaderFunctionArgs) {
  const articles = await getArticles(params);

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
  const params = useParams();
  return (
    <div>
      {data.map((article, index) => (
        <div key={index}>
          <Link
            key={article._id}
            to={
              params.lang == "en"
                ? "/en/artikler/" + article.slug?.current
                : article.slug?.current!
            }
          >
            <h2 className="p-4 hover:bg-blue-50">{article.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
