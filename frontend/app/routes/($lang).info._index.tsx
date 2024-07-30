import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData, useLocation, useParams } from "@remix-run/react";
import { useEffect } from "react";
import { INFOPAGE_QUERYResult } from "sanity/types";
import { getInfoPage } from "~/queries/info-queries";
import { useBackgroundColor } from "~/utils/backgroundColor";
import { useTranslation } from "~/utils/i18n";

export async function loader({ params }: LoaderFunctionArgs) {
  const informationPage = await getInfoPage(params);

  if (!informationPage) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json(informationPage);
}

function RedirectType(type: string) {
  if (type == "article") {
    return "/artikler";
  } else if (type == "event") {
    return "/event";
  } else {
    return "";
  }
}

export default function Info() {
  const data = useLoaderData<typeof loader>() as INFOPAGE_QUERYResult;
  const { setColor, setbgImage } = useBackgroundColor();
  useEffect(() => {
    setColor("bg-lightblue");
  }, [setColor]);
  useEffect(() => {
    setbgImage(``);
  }, [setbgImage]);
  const params = useParams();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col grow items-center text-[#1B1C20] font-serif">
      <h1 className="text-5xl font-bold mb-12">{data?.title}</h1>
      <div className="flex flex-col items-center font-normal gap-4 text-xl py-12 px-0">
        {data?.links?.map((link, index) => (
          <Link
            key={index}
            to={
              params.lang == "en"
                ? "/en" + `${RedirectType(link._type)}/${link.slug?.current}`
                : `${RedirectType(link._type)}/${link.slug?.current}`
            }
          >
            <p className="p-4 hover:underline font-serif text-2xl lg:text-4xl">
              {link.title || ""}
            </p>
          </Link>
        ))}
        <p>...</p>
        <Link to={params.lang == "en" ? "/en/artikler" : "/artikler"}>
          <p className="p-4 hover:underline font-serif text-2xl lg:text-4xl">
            {t(texts.allArticles)}
          </p>
        </Link>
      </div>
    </div>
  );
}

const texts = {
  allArticles: {
    en: "All articles",
    nb: "Alle artikler",
  },
};
