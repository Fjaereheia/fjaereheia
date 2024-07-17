import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Custom_ARTICLE_QUERYResult } from "sanity/types";
import { getBackgroundColor } from "~/utils/colorCombinations";
import { getArticle } from "~/queries/article-queries";
import ButtonLink from "~/components/ButtonLink";
import PortableTextComponent from "~/components/PortableTextComponent";
import urlFor from "~/utils/imageUrlBuilder";
import MuxPlayer from "@mux/mux-player-react";
import { useBackgroundColor } from "~/utils/backgroundColor";
import { useEffect } from "react";
import { useTranslation } from "~/utils/i18n";

export async function loader({ params }: LoaderFunctionArgs) {
  const article = await getArticle(params);

  if (!article) {
    throw new Response("Not Found", {
      status: 404,
    });
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

  return [
    { title: data.metaTitle ?? "Artikkel" },
    {
      property: "og:description",
      content: data.metaDescription ?? "Artikkel",
    },
  ];
};

export default function Article() {
  const data = useLoaderData<typeof loader>() as Custom_ARTICLE_QUERYResult;
  const bgColor = getBackgroundColor(data?.colorCombination);
  const { setColor } = useBackgroundColor();
  useEffect(() => {
    setColor(bgColor);
  }, [setColor]);
  const { t } = useTranslation();

  if (!data) {
    return <></>;
  }
  return (
    <div className={getBackgroundColor(data.colorCombination)}>
      <div className="flex flex-col items-center mx-6 mt- ">
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
          {data?.text && <PortableTextComponent textData={data.text} />}
          {data?.event && (
            <ButtonLink
              url={`/event/${data.event?.slug?.current}`}
              buttonText={t(texts.readMore)}
            />
          )}
        </div>
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
