import { DateTicketType } from "./Tickets";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { EVENT_QUERYResult } from "sanity/types";
import {
  formatDayAndDate,
  formatTimestamp,
} from "~/utils/dateAndTimeConverters";

type Props = {
  dateTicket: DateTicketType;
};

export async function loader({ params }: LoaderFunctionArgs) {}

export const DateTicket = ({ dateTicket }: Props) => {
  const data = useLoaderData<typeof loader>() as EVENT_QUERYResult;
  const language = data!.language!;
  const formattedDate = formatDayAndDate(dateTicket.date!, language);
  const formattedTimestamp = formatTimestamp(dateTicket.date!, language);
  return (
    <div className="flex flex-col gap-2 my-4">
      <p className="capitalize text-2xl">{formattedDate}</p>
      <div className="flex flex-col gap-2 mx-1">
        <p>{formattedTimestamp}</p>
        <button
          className="py-2 w-32 text-base px-10 border"
          onClick={() => window.open(dateTicket.url, "_blank")}
        >
          {language == "en" ? "Buy" : "Kjøp"}
        </button>
      </div>
    </div>
  );
};
