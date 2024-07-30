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
import { FloatingBuyButton } from "~/components/FloatingBuyButton";
import { useSlugContext } from "~/utils/i18n/SlugProvider";
import { useTranslation } from "~/utils/i18n";
import { initBuyButtonObserver } from "~/utils/BuyButtonObserver";

export async function loader({ params }: LoaderFunctionArgs) {
  const event = await getEvent(params);

  if (!event) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  if (event == "No translation with this slug") {
    throw new Response("No translation found", {
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
  const [viewScale, setViewScale] = useState(1);
  const { language } = useTranslation();

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
    quoteStyle,
  } = getColor(data?.colorCombinationsNight);

  const { setColor } = useBackgroundColor();
  const { setSlug } = useSlugContext();

  useEffect(() => {
    setColor(bgColor);
    setSlug(language, data?._translations);
  }, [bgColor, setColor]);

  useEffect(() => {
    const updateViewScale = () => {
      if (window.innerWidth > 768) {
        setViewScale(2.4);
      } else if (window.innerWidth < 320) {
        setViewScale(0.6);
      } else if (320 <= window.innerWidth && window.innerWidth < 640) {
        const widthScale = 640 - 320;
        const imageScale = 1.4 - 0.6;
        const width = window.innerWidth;
        const scale = width / (widthScale / imageScale);
        setViewScale(scale);
      } else {
        const widthScale = 1024 - 640;
        const imageScale = 2.25 - 1.2;
        const width = window.innerWidth;
        const scale = width / (widthScale / imageScale);
        setViewScale(scale);
      }
    };
    updateViewScale();
    window.addEventListener("resize", updateViewScale);
  }, []);

  if (!data) {
    return <></>;
  }

  initBuyButtonObserver();

  return (
    <>
      <div
        className={`flex grow flex-col w-full sm:max-w-screen-sm mx-auto relative justify-center justify-self-center ${textColor} items-center p-4 gap-6`}
      >
        {data.image?.asset?._ref && (
          <ImageEventPage
            url={urlFor(data.image.asset._ref, data.image?.hotspot)}
            alt={data?.title || ""}
            scale={viewScale}
            imageMaskType={data?.imageMask || ""}
          />
        )}

        <h1 className={`font-serif text-2xl lg:text-4xl`}>{data.title}</h1>

        {data.dates && (
          <EventLabels
            dateObj={data.dates}
            genre={data.eventGenre}
            primaryText={primaryText}
            secondaryBgColor={secondaryBgColor}
            secondaryBorder={secondaryBorder}
            textColor={textColor}
            textColorBorder={textColorBorder}
          />
        )}
        {data.text && (
          <PortableTextComponent
            textData={data.text}
            textStyle={portabletextStyle}
            styleBlock={quoteStyle.styleBlock}
            styleLink={quoteStyle.styleLink}
            fillColor={quoteStyle.fillColor}
          />
        )}
        {data.dates && <Tickets dateTickets={data.dates} />}

        {data.roleGroups && <RoleDropDown roleGroups={data.roleGroups} />}
      </div>
      <FloatingBuyButton handleScroll={handleScroll} textColor={textColor} />
    </>
  );
}
