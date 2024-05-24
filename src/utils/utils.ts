import bcrypt from "bcrypt";

export function getFormattedDateTime() {
  const days = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
  const now = new Date();
  const dayName = days[now.getDay()];
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${dayName}, ${hours}:${minutes}`;
}

export function formatTimeDB(timestamp: string) {
  const date = new Date(timestamp);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatIndonesianDate(timestamp: string) {
  const daysOfWeek = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const monthsOfYear = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = new Date(timestamp);

  const dayOfWeek = daysOfWeek[date.getUTCDay()]; // Get the day of the week in UTC
  const dayOfMonth = date.getUTCDate(); // Get the day of the month in UTC
  const month = monthsOfYear[date.getUTCMonth()]; // Get the month in UTC
  const year = date.getUTCFullYear(); // Get the year in UTC

  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
}

export const getDataNow = () => {
  const event = new Date();
  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return event.toLocaleDateString("id-ID", options);
};

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const result = await bcrypt.hash(password, saltRounds);
  return result;
};

export const comparePassword = async (
  password: string,
  hashPassword: string
) => {
  const result = await bcrypt.compare(password, hashPassword);
  return result;
};
