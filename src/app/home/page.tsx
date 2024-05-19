import AppShel from "@/components/layout/appShel";
import CardMemo from "@/components/ui/card-memo";

const data = [
  {
    id: 1,
    judul: "Judul1",
    date: "Minggu, 1 Januari 2022",
    time: "17:41",
    teks: "lorem",
  },
  {
    id: 2,
    judul: "Judul2",
    date: "Minggu, 2 Januari 2022",
    time: "17:42",
    teks: "ipsum",
  },
];

export default function Home() {
  return (
    <AppShel>
      <div className="p-2 flex flex-col gap-3 w-[95%] m-auto pb-20 lg:w-[70%]">
        {data.map((data) => (
          <CardMemo
            id={data.id}
            key={data.id}
            judul={data.judul}
            date={data.date}
            time={data.time}
          />
        ))}
      </div>
    </AppShel>
  );
}
