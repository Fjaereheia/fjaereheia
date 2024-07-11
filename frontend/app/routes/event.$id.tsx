import { useEffect, useState } from "react";
import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { EVENT_QUERYResult } from "sanity/types";
import { EVENT_QUERY } from "~/queries/event-queries";
import { getBackgroundColor } from "~/utils/colorCombinations";
import PortableTextComponent from "~/components/PortableTextComponent";
import urlFor from "~/utils/imageUrlBuilder";
import { Tickets } from "~/components/Tickets";
import ImageEventPage from "~/components/Masks/ImageEventPage";

export async function loader({ params }: LoaderFunctionArgs) {
  const event = await client.fetch<EVENT_QUERYResult>(EVENT_QUERY, params);

  if (!event) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json(event);
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (typeof data === "string" || !data) {
    return [
      { title: "Forestilling" },
      {
        property: "og:description",
        content: "Informasjon om forestilling",
      },
    ];
  }

  return [
    { title: data.metaTitle ?? "Forestilling" },
    {
      property: "og:description",
      content: data.metaDescription ?? "Artikkel",
    },
  ];
};

export default function Event() {
  const data = useLoaderData<typeof loader>() as EVENT_QUERYResult;

  const [viewScale, setViewScale] = useState(1);

  useEffect(() => {
    const updateViewScale = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setViewScale(2.25);
      } else {
        setViewScale(1.25);
      }
    };

    updateViewScale();
    window.addEventListener("resize", updateViewScale);

    return () => {
      window.removeEventListener("resize", updateViewScale);
    };
  }, []);

  if (!data) {
    return <></>;
  }

  return (
    <div
      className={`${getBackgroundColor(
        data.colorCombination
      )} flex flex-col relative justify-center items-center`}
    >
      {data.image?.asset?._ref ? (
        <ImageEventPage
          url={urlFor(data.image.asset._ref, data.image?.hotspot)}
          alt={data?.title || "Image"}
          scale={viewScale}
          imageMaskType={data?.imageMask || ""}
        />
      ) : (
        <p>No image available</p>
      )}
      <div className="static">
        <h1 className="font-serif text-2xl lg:text-4xl">{data.title}</h1>
        {data.text && <PortableTextComponent textData={data.text} />}
        {data.dates && <Tickets dateTickets={data.dates} />}
      </div>
    </div>
  );
}
