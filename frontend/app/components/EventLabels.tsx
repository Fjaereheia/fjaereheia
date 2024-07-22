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
  genre?: string | undefined;
};

export function formatDateOnly(dateString: string): string {
  const d = dateString.split("T")[0];
  const day = d.split("-");
  return day[day.length - 1];
}

export const EventLabels = ({ dateObj, genre }: Props) => {
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
        <div className="prose mr-auto sm:m-0 sm:relative font-serif text-white md:text-lg">
          <div className="left-0 flex gap-4 sm:float-start bg-inherit pt-2 sm:pr-2">
            <div className="-mr-2 border p-2 border-[#F8F8F8] bg-inherit">
              {dateObj.length === 1 ? (
                formattedDate.toUpperCase()
              ) : (
                <>
                  {t(texts.plays).toUpperCase()} {datesOnlyFirst + ".-"}
                  {datesOnlyLast + "."}{" "}
                  {getMonth(firstDate!, language)?.toUpperCase()}
                </>
              )}
            </div>
            <div className="p-2 border border-[#F8F8F8]">
              {formattedTimestamp.toUpperCase()}
            </div>
          </div>

          <div className="left-0 pt-2 flex gap-4 sm:float-start">
            {genre && (
              <div className="-mr-2 p-2 border border-[#F8F8F8]">
                {genre}.toUpperCase()
              </div>
            )}

            <button
              onClick={handleScroll}
              className="pl-2 p-2 border bg-[#F8F8F8] font-bold text-darkBluePrimaryGreenSecondary-primary"
            >
              {t(texts.buyTicket).toUpperCase()}
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
  buyTicket: {
    en: "Buy ticket",
    nb: "Kjøp billett",
  },
};
