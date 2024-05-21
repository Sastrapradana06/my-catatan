import bcrypt from "bcrypt";

export function getFormattedDateTime() {
  const days = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
  const now = new Date();
  const dayName = days[now.getDay()];
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${dayName}, ${hours}:${minutes}`;
}

export const getDataNow = () => {
  const event = new Date();
  const options: Parameters<typeof Intl.DateTimeFormat>[1] = {
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
