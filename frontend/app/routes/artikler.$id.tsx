import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, MetaFunction, useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { ARTICLE_QUERYResult } from "sanity/types";
import { getBackgroundColor } from "~/utils/colorCombinations";
import MuxVideo from "~/components/MuxVideo";
import { ARTICLE_QUERY } from "~/queries/article-queries";
import ButtonLink from "~/components/ButtonLink";
import PortableTextComponent from "~/components/PortableTextComponent";
import urlFor from "~/utils/imageUrlBuilder";

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

  return [
    { title: data.metaTitle ?? "Artikkel" },
    {
      property: "og:description",
      content: data.metaDescription ?? "Artikkel",
    },
  ];
};

export default function Article() {
  const data = useLoaderData<typeof loader>() as ARTICLE_QUERYResult;

  if (!data) {
    return <></>;
  }

  return (
    <div className={getBackgroundColor(data.colorCombination)}>
      <div className="flex flex-col items-center mx-6 mt- ">
        <div className="flex flex-col items-start md:w-full lg:w-1/2">
          <h1 className="text-4xl">{data.title}</h1>
          {data.image && (
            <img
              className="w-3/4 md:w-3/4 lg:w-1/2"
              src={urlFor(data.image.asset?._ref || "")}
              alt={data.image.alt}
            ></img>
          )}
          {data.video?.asset && (
            <MuxVideo
              playbackId={
                (data.video?.asset as { playbackId?: string })?.playbackId || ""
              }
              title={data.title}
            />
          )}
          {data?.text && <PortableTextComponent textData={data.text} />}
          {data?.event && (
            <ButtonLink
              url={`/event/${data.event?.slug?.current}`}
              buttonText="Les mer om forestilling"
            />
          )}
        </div>
      </div>
    </div>
  );
}
