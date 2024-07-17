import { useEffect, useState } from "react";
import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
import { createTexts, useTranslation } from "~/utils/i18n";
import { getEvent } from "~/queries/event-queries";
import { useBackgroundColor } from "~/utils/backgroundColor";
import useIntersectionObserver from "~/utils/ticketsVisability";
import { useBackgroundColor } from "~/utils/backgroundColor";

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
  const data = useLoaderData<typeof loader>() as EVENT_QUERYResult;
  const [openRole, setOpenRole] = useState(false);
  const [isTicketVisable, setIsTicketVisable] = useState(false);
  const [isLabelVisable, setIsLabelVisalbe] = useState(false);
  const [viewScale, setViewScale] = useState(1);

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
  const bgColor = getBackgroundColor(data?.colorCombination);
  const { setColor } = useBackgroundColor();
  useEffect(() => {
    setColor(bgColor);
  }, [setColor]);
  const { t } = useTranslation();

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
      )} flex flex-col justify-center items-center min-h-screen`}
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
        <h1 className="font-serif text-white text-2xl lg:text-4xl">
          {data.title}
        </h1>
      </div>
      {data.dates && (
        <div ref={setLabelRef}>
          <EventLabels dateObj={data.dates} genre={data.eventGenre} />
        </div>
      )}
      {data.text && <PortableTextComponent textData={data.text} />}

      {data.dates && (
        <div ref={setTicketRef}>
          <Tickets dateTickets={data.dates} />
        </div>
      )}
      {!isLabelVisable && !isTicketVisable && (
        <div className="sticky bottom-24 w-full md:left-auto flex flex-col items-center md:items-start bg-red-400 md:w-20 z-10 text-2xl font-serif">
          <div className="md:relative md:bottom-0 md:left-0 bg-red-400 p-3 h-[5vh]">
            <button onClick={handleScroll}>Kjøp</button>
          </div>
        </div>
      )}
      {data.roleGroups && (
        <button
          className="w-80 h-auto py-4 px-6 m-4 grid grid-flow-col bg-inherit border border-black"
          onClick={() => setOpenRole(!openRole)}
        >
          <span className="self-center justify-self-start text-xl">
            {t(texts.roleDropDown)}{" "}
          </span>
          <img
            className="w-6 h-6 self-center justify-self-end"
            src={openRole ? ArrowUp : ArrowDown}
            alt={
              openRole
                ? t(texts.roleDropDownAltUp)
                : t(texts.roleDropDownAltDown)
            }
          />
        </button>
      )}
      {openRole && <RoleDropDown roleGroups={data.roleGroups} />}
    </div>
  );
}

const texts = createTexts({
  roleDropDown: {
    nb: "Medvirkende",
    en: "Participants",
  },
  roleDropDownAltUp: {
    nb: "Pil opp",
    en: "Arrow Up",
  },
  roleDropDownAltDown: {
    nb: "Pil ned",
    en: "Arrow Down",
  },
});
