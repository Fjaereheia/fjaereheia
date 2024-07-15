import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useLocation, useParams } from "@remix-run/react";
import { ARTICLES_QUERYResult } from "sanity/types";
import { getArticles } from "~/queries/article-queries";
import { useTranslation } from "~/utils/i18n";

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
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t(texts.header)}</h1>
      <p>{t(texts.blurb)}</p>
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

const texts = {
  header: {
    en: "Articles",
    nb: "Artikler",
  },
  blurb: {
    en: "Here there are articles",
    nb: "Her er det artikler",
  },
};
