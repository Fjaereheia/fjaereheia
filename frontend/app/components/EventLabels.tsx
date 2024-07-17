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
};

export function formatDateOnly(dateString: string): string {
  const d = dateString.split("T")[0];
  const day = d.split("-");
  return day[day.length - 1];
}

export const EventLabels = ({ dateObj }: Props) => {
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
        <div className="m-4 mr-auto md:mr-0 md:relative text-lg md:text-xl">
          <div className="mb-4 left-0 flex gap-4 md:float-start text-inherit">
            <div className="p-1 border-2 border-gray-400">
              {dateObj.length === 1 ? (
                formattedDate
              ) : (
                <>
                  {t(texts.plays)} {datesOnlyFirst + ".-"}
                  {datesOnlyLast + "."} {getMonth(firstDate!, language)}
                </>
              )}
            </div>
            <div className="p-1 border-2 border-gray-400">
              {formattedTimestamp}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-1 border-2 border-gray-400">{t(texts.genre)}</div>
            <button
              onClick={handleScroll}
              className="border-2 pl-2 pr-2 border-gray-400 bg-slate-400 text-white"
            >
              {t(texts.buyTicket)}
            </button>
          </div>
        </div>
      </>
    );
  };
  const handleScroll = () => {
    const target = document.getElementById("dateTicket");
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
