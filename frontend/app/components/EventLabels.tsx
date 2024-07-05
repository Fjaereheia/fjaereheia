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
function getMonthName(dateString: string): string {
  const monthNameShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const date = new Date(dateString);
  const month = date.getMonth();

  return monthNameShort[month];
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
  const monthName = getMonthName(dateTime);

  return (
    <div className="m-4">
      <div className="m-1 flex gap-4">
        <div className="p-1 border-2 border-gray-400">
          {weekDay} {day}.{monthName}
        </div>
        <div className="p-1 border-2 border-gray-400">
          Kl. {hour}.{minute}
        </div>
      </div>
      <div className="m-1 flex gap-4">
        <div className="p-1 border-2 border-gray-400">Sjanger?</div>
        <div className="border-2 pl-2 pr-2 border-gray-400 bg-slate-400 text-white flex items-center justify-center">
          <ButtonLinkExternal url={"/"} buttonText="KJØP BILLETT" />
        </div>
      </div>
    </div>
  );
}
