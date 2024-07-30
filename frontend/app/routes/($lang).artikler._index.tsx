import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { ARTICLES_QUERYResult } from "sanity/types";
import { getArticles } from "~/queries/article-queries";
import { useBackgroundColor } from "~/utils/backgroundColor";
import { useEffect } from "react";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const articles = await getArticles(params);

  if (!articles) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return articles;
}

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  if (!data) {
    return [
      { title: "Artikler" },
      {
        property: "og:description",
        content: "Page not found",
      },
    ];
  }
  const path = location.pathname;
  let language = "nb";
  if (path.includes("/en")) {
    language = "en";
  }
  const texts: {
    title: { [key: string]: string };
    description: { [key: string]: string };
  } = {
    title: {
      en: "Articles",
      nb: "Artikler",
    },
    description: {
      en: "Overview of articles",
      nb: "Oversikt over artikler",
    },
  };

  const title = texts.title[language];
  const description = texts.description[language];

  return [
    { title: data.metaTitle ?? title },
    {
      property: "og:description",
      content: data.metaDescription ?? description,
    },
  ];
};

export default function Articles() {
  const data = useLoaderData<typeof loader>() as ARTICLES_QUERYResult;
  const params = useParams();
  const { setColor } = useBackgroundColor();

  if (data.length == 0) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  useEffect(() => {
    setColor("bg-white");
  }, [setColor]);
  return (
    <div className="grow flex flex-col items-center">
      <div className="text-center absolute pt-[151px]">
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
              <h2 className="p-4 hover:underline font-serif text-2xl lg:text-4xl">
                {article.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
