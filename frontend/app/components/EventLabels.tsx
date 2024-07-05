import { getDayOfWeek, getMonthName } from "~/functions/DateFormatting";
import ButtonLinkExternal from "./ButtonLinkExternal";
import { DateTicket } from "./DateTicket";
import { DateTicketType } from "./Tickets";
import { useLoaderData } from "@remix-run/react";
import { EVENT_QUERYResult } from "sanity/types";
import {
  formatDayAndDate,
  formatTimestamp,
} from "~/utils/dateAndTimeConverters";
import { LoaderFunctionArgs } from "@remix-run/node";

type Props = {
  dateTicket: DateTicketType;
};

export async function loader({ params }: LoaderFunctionArgs) {}

export default function EventLabels({ dateTicket }: Props) {
  /*const dates = dateTime[0];
  const [dateString, time] = dates.split("T");
  const [year, month, day] = dateString.split("-");
  const [hour, minute, second] = time.split(":");
  const weekDay = getDayOfWeek(day);
  const monthName = getMonthName(month);
*/
  const data = useLoaderData<typeof loader>() as EVENT_QUERYResult;
  console.log(data);
  const language = data!.language!;
  const formattedDate = formatDayAndDate(dateTicket?.date!, language);
  const formattedTimestamp = formatTimestamp(dateTicket?.date!, language);
  console.log(formattedDate, formattedTimestamp);

  return (
    <div>
      <div>
        <div>
          <p className="capitalize text-2xl">{formattedDate}</p>
        </div>
        <div>{formattedTimestamp}</div>
      </div>
    </div>
    /*<div className="m-4">
      <div className="m-1 flex gap-4">
        <div className="p-1 border-2 border-gray-400">
          {weekDay} {day}.{monthName}
        </div>
        <div className="p-1 border-2 border-gray-400">
          Kl. {hour}.{minute}
        </div>
      </div>
      <div className="m-1 flex gap-4">
        <div className="p-1 border-2 border-gray-400">Sjanger?</div>
        <div className="border-2 pl-2 pr-2 border-gray-400 bg-slate-400 text-white flex items-center justify-center">
          Kjøp billett
        </div>
      </div>
    </div>*/
  );
}
