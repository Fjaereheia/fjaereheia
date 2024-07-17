import { useContext, useEffect, useState } from "react";
import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData, useLocation } from "@remix-run/react";
import { EVENT_QUERYResult } from "sanity/types";
import { getBackgroundColor } from "~/utils/colorCombinations";
import PortableTextComponent from "~/components/PortableTextComponent";
import urlFor from "~/utils/imageUrlBuilder";
import { Tickets } from "~/components/Tickets";
import ImageEventPage from "~/components/Masks/ImageEventPage";
import { EventLabels } from "~/components/EventLabels";
import ArrowUp from "/arrow-up.svg";
import ArrowDown from "/arrow-down.svg";
import RoleDropDown from "~/components/RoleDropDown";
import { getEvent } from "~/queries/event-queries";
import { BackgroundColorContext } from "~/BackgroundColorContext";

export async function loader({ params }: LoaderFunctionArgs) {
  const event = await getEvent(params);

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
  const [openRole, setOpenRole] = useState(false);

  const [viewScale, setViewScale] = useState(1);

  const { color, setColor } = useContext(BackgroundColorContext);

  useEffect(() => {
    const newBackgroundColor = getBackgroundColor(data!.colorCombination);
    setColor(newBackgroundColor);
  }, [data!.colorCombination]);

  useEffect(() => {
    document.body.className = color;
  }, [setColor, color]);

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
  }, [viewScale]);

  if (!data) {
    return <></>;
  }
  return (
    <div
      className={`${getBackgroundColor(
        data.colorCombination
      )} flex flex-col relative justify-center items-center`}
    >
      {data.image?.asset?._ref && (
        <ImageEventPage
          url={urlFor(data.image.asset._ref, data.image?.hotspot)}
          alt={data?.title || ""}
          scale={viewScale}
          imageMaskType={data?.imageMask || ""}
        />
      )}
      <div className="static">
        <h1 className="font-serif text-2xl lg:text-4xl">{data.title}</h1>
      </div>
      {data.dates && <EventLabels dateObj={data.dates} />}
      {data.text && <PortableTextComponent textData={data.text} />}
      {data.dates && <Tickets dateTickets={data.dates} />}
      {data.roleGroups && (
        <button
          className="w-80 h-auto py-4 px-6 m-4 grid grid-flow-col bg-inherit border border-black"
          onClick={() => setOpenRole(!openRole)}
        >
          <span className="self-center justify-self-start text-xl">
            Medvirkende{" "}
          </span>
          <img
            className="w-6 h-6 self-center justify-self-end"
            src={openRole ? ArrowUp : ArrowDown}
            alt={openRole ? "Pil opp" : "Pil ned"}
          />
        </button>
      )}
      {openRole && <RoleDropDown roleGroups={data.roleGroups} />}
    </div>
  );
}
