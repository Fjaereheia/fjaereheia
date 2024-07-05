export function getDayOfWeek(dateString: string): string {
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
export function getMonthName(dateString: string): string {
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
