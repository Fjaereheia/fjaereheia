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

  initBuyButtonObserver();

  return (
    <>
      <div
        className={`flex grow flex-col relative justify-center ${textColor} items-center p-4`}
      >
        {data.image?.asset?._ref && (
          <ImageEventPage
            url={urlFor(data.image.asset._ref, data.image?.hotspot)}
            alt={data?.title || ""}
            scale={viewScale}
            imageMaskType={data?.imageMask || ""}
          />
        )}
        <div
          className={`flex flex-col relative justify-center ${textColor} items-center gap-6`}
        >
          <div className="static">
            <h1 className={`font-serif text-2xl lg:text-4xl`}>{data.title}</h1>
          </div>
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
          {data.dates && (
            <div className={`flex self-start`}>
              <Tickets dateTickets={data.dates} />
            </div>
          )}

          {data.roleGroups && <RoleDropDown roleGroups={data.roleGroups} />}
        </div>
      </div>
      <FloatingBuyButton handleScroll={handleScroll} textColor={textColor} />
    </>
  );
}
