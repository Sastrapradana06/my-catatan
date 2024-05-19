"use client";

import { useAppStore } from "@/utils/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { useShallow } from "zustand/react/shallow";

export function Navbar() {
  const [setIsEdit] = useAppStore(
    useShallow((state: any) => [state.setIsEdit])
  );
  const pathname = usePathname();

  return (
    <div className=" p-1 fixed top-0 w-[100%] border-b-b z-10 bg-[#2B2730]">
      <div className=" w-[90%] m-auto flex justify-between lg:w-[70%]">
        <div className="text-[1.8rem]">
          <h1 className="font-judul text-[1.5rem] tracking-[2px]">Mycatatan</h1>
        </div>
        <div className="flex justify-center gap-4 items-center">
          <button onClick={() => setIsEdit(true)}>Edit</button>
          <button>
            <Link href="/">
              <BiSearch size={25} />
            </Link>
          </button>
        </div>
      </div>
      <div className=" mt-5 w-[90%] m-auto flex justify-center gap-32 ">
        <div className="flex flex-col items-center gap-2">
          <button
            className={`${pathname === "/home" ? "text-orange-400" : ""}`}
          >
            <Link href="/home">Semua</Link>
          </button>
          <span
            className={pathname === "/home" ? "border w-[30px]" : "hidden"}
          ></span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            className={`${pathname === "/bookmark" ? "text-orange-400" : ""}`}
          >
            <Link href="/bookmark">BookMark</Link>
          </button>
          <span
            className={pathname === "/bookmark" ? "border w-[30px]" : "hidden"}
          ></span>
        </div>
      </div>
    </div>
  );
}
