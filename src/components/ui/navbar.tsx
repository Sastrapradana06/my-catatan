"use client";

import { useAppStore } from "@/utils/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useShallow } from "zustand/react/shallow";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function Navbar() {
  const [isModalSignOut, setIsModalSignOut] = useState(false);
  const [setIsEdit] = useAppStore(
    useShallow((state: any) => [state.setIsEdit])
  );
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
  };

  const ModalSignOut = () => {
    return (
      <section className="w-full h-[100vh] absolute bg-[#00000048] backdrop-blur-sm flex justify-center items-center z-50 top-0 left-0">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => setIsModalSignOut(false)}
              title="Close modal"
              aria-label="Close modal"
              name="Close modal"
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-300 dark:text-gray-300">
                Apakah kamu yakin ingin keluar?
              </h3>
              <button
                onClick={handleLogout}
                title="Sign Out"
                name="Sign Out"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, Im sure
              </button>
              <button
                onClick={() => setIsModalSignOut(false)}
                title="Cancel"
                name="Cancel"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      {isModalSignOut && <ModalSignOut />}
      <div className=" p-1 fixed top-0 w-[100%] border-b-b z-10 bg-[#2B2730]">
        <div className=" w-[90%] m-auto flex justify-between lg:w-[70%]">
          <div className="text-[1.8rem]">
            <h1 className="font-judul text-[1.5rem] tracking-[2px]">
              Mycatatan
            </h1>
          </div>
          <div className="flex justify-center gap-4 items-center">
            <button
              title="Logout"
              name="btn-logout"
              onClick={() => setIsModalSignOut(true)}
            >
              <RiLogoutCircleRLine size={23} className="text-yellow-500" />
            </button>
            <button
              title="delete"
              name="btn-delete"
              onClick={() => setIsEdit(true)}
            >
              <MdDelete size={23} className="text-red-500" />
            </button>
            <button title="search" name="btn-search">
              <Link href="/cari-memo">
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
              className={
                pathname === "/bookmark" ? "border w-[30px]" : "hidden"
              }
            ></span>
          </div>
        </div>
      </div>
    </>
  );
}
