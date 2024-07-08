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
    <div id="dateTicket" className="flex flex-col items-center mx-6 mt-">
      <h1 className="text-4xl">Billetter</h1>
      {dateTickets?.map((dateTicket: DateTicketType) => {
        return <DateTicket dateTicket={dateTicket} />;
      })}
    </div>
  );
};
