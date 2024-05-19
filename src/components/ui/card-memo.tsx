import Link from "next/link";
import BtnCheckBox from "./btn-checkbox";

const CardMemo = ({
  id,
  judul,
  date,
  time,
}: {
  id: string | number;
  judul: string;
  date: string;
  time: string;
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
            <p className="text-gray-400 mt-1 text-[.8rem]">{date}</p>
          </div>
          <div className=" p-1 h-[60px] flex flex-col justify-between items-end mr-2">
            <p className="text-[.8rem] text-gray-400">{time}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardMemo;

{
  /* {teks.aksi ? (
                        <p className="-mt-4 italic text-[.7rem] text-gray-500">
                          Diperbarui {teks.aksi.dayNow}, {teks.aksi.timeNow}
                        </p>
                      ) : (
                        <p></p>
                      )} */
}
