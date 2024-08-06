import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Custom_ARTICLE_QUERYResult } from "../../sanity/types";
import { getBackgroundColor, getColor } from "../utils/colorCombinations";
import { getArticleQuery } from "../queries/article-queries";
import PortableTextComponent from "../components/PortableTextComponent";
import urlFor from "../utils/imageUrlBuilder";
import MuxPlayer from "@mux/mux-player-react";
import { useBackgroundColor } from "../utils/backgroundColor";
import { useEffect } from "react";
import { useTranslation } from "../utils/i18n";
import { useSlugContext } from "../utils/i18n/SlugProvider";
import { loadQuery } from "../../sanity/loader.server";
import { QueryResponseInitial } from "@sanity/react-loader";
import { useQuery } from "../../sanity/loader";

export async function loader({ params }: LoaderFunctionArgs) {
  const query = getArticleQuery(params);
  const initial = await loadQuery<Custom_ARTICLE_QUERYResult>(query, params);
  const article = initial.data;

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

  return { initial, query: query, params: params };
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

  const sanityData = data?.initial.data;

  if (!sanityData) {
    return [
      { title: title },
      {
        property: "og:description",
        content: description,
      },
    ];
  }

  return [
    { title: sanityData.metaTitle ?? title },
    {
      property: "og:description",
      content: sanityData.metaDescription ?? description,
    },
  ];
};

export default function Article() {
  const { initial, query, params } = useLoaderData<typeof loader>() as {
    initial: QueryResponseInitial<Custom_ARTICLE_QUERYResult>;
    query: string;
    params: Record<string, string>;
  };

  const { data } = useQuery<typeof initial.data>(query, params, {
    initial,
  });

  const bgColor = getBackgroundColor(data?.colorCombinationsDay);
  const { setColor } = useBackgroundColor();
  const { portabletextStyle, quoteStyle } = getColor(
    data?.colorCombinationsDay
  );
  const { setSlug } = useSlugContext();

  useEffect(() => {
    setColor(bgColor);
    setSlug(language, data?._translations);
  });
  const { t, language } = useTranslation();

  return (
    <div
      className={`${getBackgroundColor(
        data.colorCombinationsDay
      )} flex flex-col items-center grow mx-6 self-center md:w-full lg:w-1/2`}
    >
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
            language == "en"
              ? `/en/event/${data.event?.slug?.current}`
              : `/event/${data.event?.slug?.current}`
          }
        >
          {t(texts.readMore)}
        </Link>
      )}
    </div>
  );
}

const texts = {
  readMore: {
    en: "Read more about the event",
    nb: "Les mer om forestillingen",
  },
};
