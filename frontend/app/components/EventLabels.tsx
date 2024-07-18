import {
  formatDayAndDate,
  formatTimestamp,
  getMonth,
} from "~/utils/dateAndTimeConverters";
import { useTranslation } from "~/utils/i18n";

type DateObject = {
  date?: string | undefined;
  url?: string | undefined;
  _key?: string | undefined;
};

type Props = {
  dateObj: DateObject[];
  primary?: string;
  secondary?: string;
  textColor?: string;
};

export function formatDateOnly(dateString: string): string {
  const d = dateString.split("T")[0];
  const day = d.split("-");
  return day[day.length - 1];
}

export const EventLabels = ({
  dateObj,
  primary,
  secondary,
  textColor,
}: Props) => {
  const { language, t } = useTranslation();

  const renderLabel = () => {
    const firstDate = dateObj[0].date ?? "";
    const lastdate = dateObj[dateObj.length - 1].date ?? "";
    const formattedTimestamp = formatTimestamp(firstDate, language);
    const formattedDate = formatDayAndDate(firstDate, language);
    const datesOnlyFirst = formatDateOnly(firstDate);
    const datesOnlyLast = formatDateOnly(lastdate);

    return (
      <>
        <div className="m-4">
          <div className="m-1 flex gap-4">
            <div
              className={`p-1 border-2 border-${secondary} text-${textColor}`}
            >
              {dateObj.length === 1 ? (
                formattedDate
              ) : (
                <>
                  {t(texts.plays)} {datesOnlyFirst + ".-"}
                  {datesOnlyLast + "."} {getMonth(firstDate!, language)}
                </>
              )}
            </div>
            <div
              className={`p-1 border-2 border-${secondary} text-${textColor}`}
            >
              {formattedTimestamp}
            </div>
          </div>
          <div className="m-1 flex gap-4">
            <div
              className={`p-1 border-2 border-${secondary} text-${textColor}`}
            >
              {t(texts.genre)}
            </div>
            <button
              onClick={handleScroll}
              className={`pl-2 pr-2 border-2 border-${secondary} bg-${secondary} text-${primary}`}
            >
              {t(texts.buyTicket)}
            </button>
          </div>
        </div>
      </>
    );
  };
  const handleScroll = () => {
    const target = document.getElementById("tickets");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
  return renderLabel();
};

const texts = {
  plays: {
    en: "Performs",
    nb: "Spilles",
  },
  genre: {
    en: "Genre",
    nb: "Sjanger",
  },
  buyTicket: {
    en: "Buy ticket",
    nb: "Kjøp billett",
  },
};
