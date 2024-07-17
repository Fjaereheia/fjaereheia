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
    <div className="my-4">
      <p className="capitalize text-2xl">{formattedDate}</p>
      <div className="flex items-center my-6 mx-1">
        <p>{formattedTimestamp}</p>
        <button
          className="mx-4 p-4 border-2"
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
    en: "Buy Ticket",
    nb: "Kjøp Billett",
  },
};
