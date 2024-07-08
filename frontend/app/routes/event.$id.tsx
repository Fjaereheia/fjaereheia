import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "sanity/clientConfig";
import { EVENT_QUERYResult } from "sanity/types";
import { EVENT_QUERY } from "~/queries/event-queries";
import { getBackgroundColor } from "~/utils/colorCombinations";
import PortableTextComponent from "~/components/PortableTextComponent";
import urlFor from "~/utils/imageUrlBuilder";
import { Tickets } from "~/components/Tickets";
import { Label } from "~/components/Labels";

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
    <div className={getBackgroundColor(data.colorCombination)}>
      <h1>Forestilling:</h1>
      {data.image?.asset?._ref ? (
        <img
          src={urlFor(data.image.asset._ref, data.image?.hotspot)}
          alt={data.title}
        />
      ) : (
        <p>No image available</p>
      )}
      {data.dates && <Label eventLabel={data.dates} />}
      {data.text && <PortableTextComponent textData={data.text} />}

      {data.dates && <Tickets dateTickets={data.dates} />}
    </div>
  );
}
