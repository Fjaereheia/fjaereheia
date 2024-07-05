import { getDayOfWeek, getMonthName } from "~/functions/DateFormatting";
import ButtonLinkExternal from "./ButtonLinkExternal";

interface EvetLabelProps {
  dateTime: string[];
  ticketUrl: string;
}

export default function EventLabels({ dateTime, ticketUrl }: EvetLabelProps) {
  if (!dateTime) {
    console.log("got here");
    return null;
  }

  const dates = dateTime + " ";
  const [dateString, time] = dates.split("T");
  const [year, month, day] = dateString.split("-");
  const [hour, minute, second] = time.split(":");
  const weekDay = getDayOfWeek(day);
  const monthName = getMonthName(month);

  return (
    <div className="m-4">
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
          <ButtonLinkExternal url={ticketUrl} buttonText="KJØP BILLETT" />
        </div>
      </div>
    </div>
  );
}
