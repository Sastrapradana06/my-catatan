import Link from "next/link";
import BtnCheckBox from "./btn-checkbox";

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

const CardMemo = ({
  id,
  judul,
  date,
  time_update,
}: {
  id: string | number;
  judul: string;
  date: string;
  time_update: string;
}) => {
  return (
    <div className="">
      <BtnCheckBox id={id} />

      <Link href={`/memo/${id}`}>
        <div className="h-[100px] rounded-xl bg-card flex items-center justify-between lg:h-[130px]">
          <div className="p-3 w-[70%]">
            <h1 className="text-[1.3rem] h-[30px] overflow-hidden w-[100%]">
              {judul}
            </h1>
            <p className="text-gray-400 mt-1 text-[.8rem]">
              {formatIndonesianDate(date)}
            </p>
          </div>
          <div className=" p-1 h-[60px] flex flex-col justify-between items-end mr-2">
            {time_update !== "" && (
              <p className="-mt-4 italic text-[.7rem] text-gray-500">
                Diperbarui {time_update}
              </p>
            )}
            {/* <p className="text-[.8rem] text-gray-400">{formatTimeDB(date)}</p> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardMemo;
