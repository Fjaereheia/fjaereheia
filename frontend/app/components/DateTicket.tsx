import { DateTicketType } from "./Tickets";
import {
  formatDayAndDate,
  formatTimestamp,
} from "~/utils/dateAndTimeConverters";
import { useTranslation } from "~/utils/i18n";

type Props = {
  dateTicket: DateTicketType;
};

export const DateTicket = ({ dateTicket }: Props) => {
  const { language, t } = useTranslation();
  const formattedDate = formatDayAndDate(dateTicket.date!, language);
  const formattedTimestamp = formatTimestamp(dateTicket.date!, language);
  return (
    <div className="flex text-white flex-col gap-2 my-4">
      <p className="capitalize text-2xl">{formattedDate}</p>
      <div className="flex flex-col gap-2 mx-1">
        <p>{formattedTimestamp}</p>
        <button
          className="py-2 w-32 text-base px-10 border hover:bg-white hover:text-black"
          onClick={() => window.open(dateTicket.url, "_blank")}
        >
          {t(texts.buy)}
        </button>
      </div>
    </div>
  );
};

const texts = {
  buy: {
    en: "Buy",
    nb: "Kjøp",
  },
};
