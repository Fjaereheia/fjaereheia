import { EventLabels } from "./EventLabels";

export type EventLabelType = {
  date?: string | undefined;
};

type Props = {
  eventLabel: EventLabelType[];
};

export const Label = ({ eventLabel }: Props) => {
  const [first] = eventLabel;
  return <div>{first && <EventLabels eventLabel={first} />}</div>;
};
