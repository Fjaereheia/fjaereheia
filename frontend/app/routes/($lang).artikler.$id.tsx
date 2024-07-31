import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { Custom_ARTICLE_QUERYResult } from "../../sanity/types";
import { getBackgroundColor, getColor } from "../utils/colorCombinations";
import { getArticle } from "../queries/article-queries";
import PortableTextComponent from "../components/PortableTextComponent";
import urlFor from "../utils/imageUrlBuilder";
import MuxPlayer from "@mux/mux-player-react";
import { useBackgroundColor } from "../utils/backgroundColor";
import { useEffect } from "react";
import { useTranslation } from "../utils/i18n";
import { useSlugContext } from "../utils/i18n/SlugProvider";

export async function loader({ params }: LoaderFunctionArgs) {
  const article = await getArticle(params);

  if (!article) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  if (article == "No translation with this slug") {
    throw new Response("No translation found", {
      status: 404,
    });
  }

  return article;
}

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
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
      en: "Artikkel",
      nb: "Article",
    },
    description: {
      en: "An article",
      nb: "En artikkel",
    },
  };

  const title = texts.title[language];
  const description = texts.description[language];

  if (!data) {
    return [
      { title: title },
      {
        property: "og:description",
        content: description,
      },
    ];
  }

  return [
    { title: data.metaTitle ?? title },
    {
      property: "og:description",
      content: data.metaDescription ?? description,
    },
  ];
};

export default function Article() {
  const data = useLoaderData<typeof loader>() as Custom_ARTICLE_QUERYResult;
  const bgColor = getBackgroundColor(data?.colorCombinationsDay);
  const { language } = useTranslation();
  const { setColor } = useBackgroundColor();
  const { portabletextStyle, quoteStyle } = getColor(
    data?.colorCombinationsDay
  );
  const { setSlug } = useSlugContext();

  useEffect(() => {
    setColor(bgColor);
    setSlug(language, data?._translations);
  });
  const { t } = useTranslation();
  const params = useParams();

  return (
    <div
      className={`${getBackgroundColor(
        data.colorCombinationsDay
      )} grow flex flex-col items-center mx-6`}
    >
      <div className="flex flex-col items-center md:w-full lg:w-1/2">
        <h1 className="text-4xl">{data.title}</h1>
        {data.image && (
          <img
            className="w-3/4 md:w-3/4 lg:w-1/2"
            src={urlFor(data.image.asset?._ref || "")}
            alt={data.image.alt}
          ></img>
        )}
        {data.video?.muxVideo.asset && (
          <MuxPlayer
            disableCookies={true}
            playbackId={data.video.muxVideo.asset.playbackId}
            title={data.video.title || ""}
          />
        )}
        {data?.text && (
          <PortableTextComponent
            textData={data.text}
            textStyle={portabletextStyle}
            styleBlock={quoteStyle.styleBlock}
            styleLink={quoteStyle.styleLink}
            fillColor={quoteStyle.fillColor}
          />
        )}
        {data?.event && (
          <Link
            to={
              params.lang == "en"
                ? `/en/event/${data.event?.slug?.current}`
                : `/event/${data.event?.slug?.current}`
            }
          >
            {t(texts.readMore)}
          </Link>
        )}
      </div>
    </div>
  );
}

const texts = {
  readMore: {
    en: "Read more about the event",
    nb: "Les mer om forestillingen",
  },
};
