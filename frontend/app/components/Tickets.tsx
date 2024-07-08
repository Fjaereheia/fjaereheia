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
    <div id="tickets" className="flex flex-col items-center mx-6 mt-">
      <h1 className="text-4xl">Billetter</h1>
      {dateTickets?.map((dateTicket: DateTicketType, index) => {
        return <DateTicket key={index} dateTicket={dateTicket} />;
      })}
    </div>
  );
};
