import Link from "next/link";

const CardMemo = ({ id }: { id: string | number }) => {
  return (
    <div className="">
      {/* <button>
        <input type="checkbox" />
      </button> */}

      <Link href={`/memo/${id}`}>
        <div className="h-[100px] rounded-xl bg-card flex items-center justify-between lg:h-[130px]">
          <div className="p-3 w-[70%]">
            <h1 className="text-[1.3rem] h-[30px] overflow-hidden w-[100%]">
              Judul
            </h1>
            <p className="text-gray-400 mt-1 text-[.8rem]">day</p>
          </div>
          <div className=" p-1 h-[60px] flex flex-col justify-between items-end mr-2">
            {/* {teks.aksi ? (
                        <p className="-mt-4 italic text-[.7rem] text-gray-500">
                          Diperbarui {teks.aksi.dayNow}, {teks.aksi.timeNow}
                        </p>
                      ) : (
                        <p></p>
                      )} */}
            <p className="text-[.8rem] text-gray-400">17:41</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardMemo;
