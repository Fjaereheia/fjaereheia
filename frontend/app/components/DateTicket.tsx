import { DateTicketType } from "./Tickets";

type Props = {
  dateTicket: DateTicketType;
};

export const DateTicket = ({ dateTicket }: Props) => {
  return (
    <div>
      <text>{dateTicket.date}</text>
      <text>{dateTicket.url}</text>
    </div>
  );
};
