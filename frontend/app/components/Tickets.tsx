import { DateTicket } from "./DateTicket";

export type DateTicketType = {
  date?: string | undefined;
  url?: string | undefined;
};

type Props = {
  dateTickets: DateTicketType[];
};

export const Tickets = ({ dateTickets }: Props) => {
  return (
    <div>
      {dateTickets?.map((dateTicket: DateTicketType) => {
        return <DateTicket dateTicket={dateTicket} />;
      })}
    </div>
  );
};
