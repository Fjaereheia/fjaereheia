import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { EVENT_QUERYResult } from "sanity/types";
import { EVENT_QUERY } from "~/queries/event-queries";
import urlFor from "app/functions/imageUrlBuilder";
import ButtonLinkExternal from "~/components/ButtonLinkExternal";
import { getBackgroundColor } from "~/functions/colorCombinations";
import PortableTextComponent from "~/components/PortableTextComponent";

export async function loader({ params }: LoaderFunctionArgs) {
  const event = await client.fetch<EVENT_QUERYResult>(EVENT_QUERY, params);

  if (!event) {
    return json("Kunne ikke finne forestilling", { status: 404 });
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

  if (!data) {
    return <></>;
  }

  return (
    <>
      <div className={getBackgroundColor(data.colorCombination)}>
        <h1>{data.title}</h1>
        {data.image?.asset?._ref ? <img src={urlFor(data.image.asset._ref, data.image?.hotspot)} alt={data.title} /> : <p>No image available</p>}
        {data.text && <PortableTextComponent textData={data.text} />}
        {data.TicketsUrl && <ButtonLinkExternal url={data.TicketsUrl} buttonText='Kjøp billetter her' />}
      </div>
    </>
  );
}
