import { useLoaderData } from "@remix-run/react";
import { EVENT_QUERYResult } from "sanity/types";
import {
  formatDayAndDate,
  formatTimestamp,
} from "~/utils/dateAndTimeConverters";
import { LoaderFunctionArgs } from "@remix-run/node";
import { EventLabelType } from "./Labels";

type Props = {
  eventLabel: EventLabelType;
};

export async function loader({ params }: LoaderFunctionArgs) {}

export const EventLabels = ({ eventLabel }: Props) => {
  const data = useLoaderData<typeof loader>() as EVENT_QUERYResult;
  const language = data!.language!;
  const formattedDate = formatDayAndDate(eventLabel.date!, language);
  const formattedTimestamp = formatTimestamp(eventLabel.date!, language);

  const handleScroll = () => {
    const target = document.getElementById("dateTicket");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="m-4">
      <div className="m-1 flex gap-4">
        <div className="p-1 border-2 border-gray-400">{formattedDate}</div>
        <div className="p-1 border-2 border-gray-400">{formattedTimestamp}</div>
      </div>
      <div className="m-1 flex gap-4">
        <div className="p-1 border-2 border-gray-400">Sjanger?</div>
        <button
          onClick={handleScroll}
          className="border-2 pl-2 pr-2 border-gray-400 bg-slate-400 text-white"
        >
          Kjøp Billett
        </button>
      </div>
    </div>
  );
};
