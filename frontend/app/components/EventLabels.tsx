import { useLoaderData } from "@remix-run/react";
import { EVENT_QUERYResult } from "sanity/types";
import {
  formatDayAndDate,
  formatTimestamp,
  getMonth,
} from "~/utils/dateAndTimeConverters";
import { LoaderFunctionArgs } from "@remix-run/node";

type dateObject = {
  date?: string | undefined;
  url?: string | undefined;
  _key?: string | undefined;
};

type Props = {
  dateObj: dateObject[];
};

export function formatDateOnly(dateString: string): string {
  const d = dateString.split("T")[0];
  const day = d.split("-");
  return day[day.length - 1];
}

export async function loader({ params }: LoaderFunctionArgs) {}

export const EventLabels = ({ dateObj }: Props) => {
  const data = useLoaderData<typeof loader>() as EVENT_QUERYResult;
  const language = data!.language!;

  const renderLabel = () => {
    if (dateObj.length === 1) {
      const date = dateObj[0].date;
      const formattedDate = formatDayAndDate(date!, language);
      const formattedTimestamp = formatTimestamp(date!, language);

      return (
        <div className="m-4">
          <div className="m-1 flex gap-4">
            <div className="p-1 border-2 border-gray-400">{formattedDate}</div>
            <div className="p-1 border-2 border-gray-400">
              {formattedTimestamp}
            </div>
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
    } else if (dateObj.length > 1) {
      const firstDate = dateObj[0].date;
      const lastdate = dateObj[dateObj.length - 1].date;
      const formattedTimestamp = formatTimestamp(firstDate!, language);
      const datesOnlyFirst = formatDateOnly(firstDate!);
      const datesOnlyLast = formatDateOnly(lastdate!);

      return (
        <div className="m-4">
          <div className="m-1 flex gap-4">
            <div className="p-1 border-2 border-gray-400">
              Spilles {datesOnlyFirst}-{datesOnlyLast}
              {getMonth(firstDate!, language)}
            </div>
            <div className="p-1 border-2 border-gray-400">
              {formattedTimestamp}
            </div>
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
    } else {
      return null;
    }
  };

  const handleScroll = () => {
    const target = document.getElementById("dateTicket");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
  return renderLabel();
};
