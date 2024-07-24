import { useEffect, useState } from "react";
import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Custom_EVENT_QUERYResult } from "sanity/types";
import { getColor } from "~/utils/colorCombinations";
import PortableTextComponent from "~/components/PortableTextComponent";
import urlFor from "~/utils/imageUrlBuilder";
import { Tickets } from "~/components/Tickets";
import ImageEventPage from "~/components/Masks/ImageEventPage";
import { EventLabels } from "~/components/EventLabels";
import RoleDropDown from "~/components/RoleDropDown";
import { getEvent } from "~/queries/event-queries";
import { useBackgroundColor } from "~/utils/backgroundColor";
import useIntersectionObserver from "~/utils/ticketsVisability";
import { useTranslation } from "~/utils/i18n";

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
      content: data.metaDescription ?? "Informasjon om forestilling",
    },
  ];
};

export default function Event() {
  const data = useLoaderData<typeof loader>() as Custom_EVENT_QUERYResult;
  const [isTicketVisable, setIsTicketVisable] = useState(false);
  const [isLabelVisable, setIsLabelVisalbe] = useState(false);
  const [viewScale, setViewScale] = useState(1);
  const { t } = useTranslation();

  const setTicketRef = useIntersectionObserver((isIntersecting) => {
    setIsTicketVisable(isIntersecting);
  });
  const setLabelRef = useIntersectionObserver((isIntersecting) => {
    setIsLabelVisalbe(isIntersecting);
  });
  const handleScroll = () => {
    const target = document.getElementById("tickets");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
  const {
    bgColor,
    primaryText,
    secondaryBgColor,
    secondaryBorder,
    textColor,
    textColorBorder,
    portabletextStyle,
  } = getColor(data?.colorCombinationsNight);
  const { setColor } = useBackgroundColor();
  useEffect(() => {
    setColor(bgColor);
  }, [setColor]);
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
  }, []);

  if (!data) {
    return <></>;
  }

  console.log(data);
  return (
    <>
      <div
        className={` min-h-screen flex flex-col relative justify-center ${textColor} items-center p-4`}
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
          <h1 className={`font-serif  text-2xl lg:text-4xl`}>{data.title}</h1>
        </div>
        {data.dates && (
          <div ref={setLabelRef}>
            <EventLabels
              dateObj={data.dates}
              genre={data.eventGenre}
              primaryText={primaryText}
              secondaryBgColor={secondaryBgColor}
              secondaryBorder={secondaryBorder}
              textColor={textColor}
              textColorBorder={textColorBorder}
            />
          </div>
        )}
        {data?.text && (
          <PortableTextComponent
            textData={data.text}
            textStyle={portabletextStyle}
          />
        )}

        {data.dates && (
          <div ref={setTicketRef}>
            <Tickets dateTickets={data.dates} />
          </div>
        )}
        {data.roleGroups && <RoleDropDown roleGroups={data.roleGroups} />}
      </div>

      {!isLabelVisable && !isTicketVisable && (
        <div
          className={`sticky bottom-12 md:bottom-24 md:w-[100px] p-2 z-10 w-full flex flex-col ${textColor} text-center items-center md:items-start bg-red-400 text-lg lg:text-xl font-serif lg:left-32 2xl:left-1/4`}
        >
          <button onClick={handleScroll}>{t(text.allEvents)}</button>
        </div>
      )}
    </>
  );
}

const text = {
  allEvents: {
    en: "Buy ticket",
    nb: "Kjøp billett",
  },
};
