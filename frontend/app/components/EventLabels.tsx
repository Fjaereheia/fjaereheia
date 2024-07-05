import ButtonLinkExternal from "./ButtonLinkExternal";

function getDayOfWeek(dateString: string): string {
  const daysOfWeek = [
    "Søndag",
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
  ];

  const date = new Date(dateString);
  const dayOfWeek = date.getDay();

  return daysOfWeek[dayOfWeek];
}

interface EvetLabelProps {
  dates: string[];
}

export default function EventLabels({ dates }: EvetLabelProps) {
  console.log(dates);
  const test = dates + " ";
  console.log(test);
  const [dateTime, clock] = test.split("T");
  const [year, month, day] = dateTime.split("-");
  const [hour, minute, second] = clock.split(":");
  const weekDay = getDayOfWeek(dateTime);
  console.log(getDayOfWeek(dateTime));

  return (
    <div className="">
      <div className="m-1 flex gap-4">
        <div className="border-2 border-white">
          {weekDay} {day}.{month}
        </div>
        <div className="border-2 border-white">
          Kl: {hour}.{minute}
        </div>
      </div>
      <div className="m-1 flex gap-4">
        <div className="border-2 border-white">Sjanger?</div>
        <ButtonLinkExternal url={"/"} buttonText="KJØP BILLETT" />
      </div>
    </div>
  );
}
