"use client";
import {
  RiCheckLine,
  RiArrowGoBackLine,
  RiArrowGoForwardFill,
  RiDeleteBin6Line,
} from "react-icons/ri";
import {
  BsArrowLeft,
  BsBookmarkStar,
  BsBookmarkStarFill,
} from "react-icons/bs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import { handleIsBookmark } from "@/lib/supabase/update";
import { useAppStore } from "@/utils/store";
import { useShallow } from "zustand/react/shallow";
import useHandleAlert from "@/app/hooks/useHandleAlert";
import Alert from "./alert";

const NavMemo = ({
  judulMemo,
  teksMemo,
  setTeksMemo,
  addMemo,
  process,
  id,
}: {
  judulMemo: string;
  teksMemo: string;
  setTeksMemo: React.Dispatch<React.SetStateAction<string>>;
  addMemo: any;
  process: boolean;
  id?: string | number;
}) => {
  const [deletedValue, setDeletedValue] = useState("");
  const { alertStatus, alertData, handleAlert } = useHandleAlert();
  const [listIdBookmark, setListIdBookmark] = useAppStore(
    useShallow((state: any) => [state.listIdBookmark, state.setListIdBookmark])
  );
  const pathname = usePathname();
  const idCatatan = parseInt(id as string);

  const handleDeleteTeks = () => {
    const updatedValue = teksMemo.substring(0, teksMemo.length - 1);
    const deleteTeks = teksMemo.slice(teksMemo.length - 1);
    setTeksMemo(updatedValue);
    setDeletedValue((prevValue) => prevValue + deleteTeks);
  };

  const handleUndo = () => {
    const newTeksMemo = deletedValue.split("").reverse().join("");
    setTeksMemo((prevValue) => prevValue + newTeksMemo);
    setDeletedValue("");
  };

  const toogleBookmark = async () => {
    if (id) {
      const result = await handleIsBookmark(id);
      if (result.status) {
        if (listIdBookmark.includes(idCatatan)) {
          setListIdBookmark(
            listIdBookmark.filter((item: any) => item != idCatatan)
          );
          handleAlert("success", "Menghapus catatan dari bookmark");
        } else {
          setListIdBookmark([...listIdBookmark, idCatatan]);
          handleAlert("success", "Menambah catatan ke bookmark");
        }
      } else {
        handleAlert("gagal", "Gagal menambah catatan ke bookmark");
      }
    }
  };

  return (
    <>
      <Alert
        status={alertStatus}
        type={alertData.type}
        message={alertData.message}
      />
      <div className=" mt-4">
        <div className=" w-[90%] m-auto h-[30px] flex justify-between items-center lg:w-[70%]">
          <div className=" flex items-center">
            <button title="kembali" name="btn-kembali">
              <Link href="/home">
                <BsArrowLeft size={25} />
              </Link>
            </button>
          </div>
          <div className="flex gap-4 lg:gap-6">
            {pathname !== "/tulis-memo" && (
              <button
                onClick={toogleBookmark}
                title="bookmark"
                name="btn-bookmark"
              >
                {listIdBookmark.includes(idCatatan) ? (
                  <TiStarFullOutline size={25} fill="orange" />
                ) : (
                  <CiStar size={25} />
                )}
              </button>
            )}
            <button
              title="delete"
              name="btn-delete"
              className={``}
              onClick={handleDeleteTeks}
              disabled={teksMemo === ""}
            >
              <RiArrowGoBackLine
                size={20}
                className={
                  teksMemo == ""
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-white cursor-pointer"
                }
              />
            </button>
            <button
              title="undo"
              name="btn-undo"
              className={``}
              onClick={handleUndo}
              disabled={deletedValue === ""}
            >
              <RiArrowGoForwardFill
                size={20}
                className={
                  deletedValue == ""
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-white cursor-pointer"
                }
              />
            </button>

            {judulMemo.length > 0 && teksMemo.length > 0 && (
              <button
                title="simpan"
                name="btn-simpan"
                onClick={addMemo}
                className="disabled:text-gray-400 disabled:cursor-not-allowed text-white"
                disabled={process}
              >
                <RiCheckLine size={25} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavMemo;
