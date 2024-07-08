import { DateTicketType } from "./Tickets";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
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

  const { t } = useTranslation();

  return (
    <div className="my-4">
      <p className="capitalize text-2xl">{formattedDate}</p>
      <div className="flex items-center my-6 mx-1">
        <p>{formattedTimestamp}</p>
        <button
          className="mx-4 p-4 border-2"
          onClick={() => window.open(dateTicket.url, "_blank")}
        >
          {t("buybutton")}
        </button>
      </div>
    </div>
  );
};
