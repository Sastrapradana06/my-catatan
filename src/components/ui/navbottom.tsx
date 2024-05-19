"use client";

import { useAppStore } from "@/utils/store";
import Link from "next/link";
import { TbNotes } from "react-icons/tb";
import { useShallow } from "zustand/react/shallow";
const NavBottom = () => {
  const [isEdit, setIsEdit] = useAppStore(
    useShallow((state: any) => [state.isEdit, state.setIsEdit])
  );

  return (
    <div className="fixed bottom-0 w-full h-[62px]  bg-[#2B2730] nav-bottom-semua">
      {isEdit ? (
        <div className="w-[50%] m-auto flex items-center justify-between nav-bottom-edit mt-5">
          <button>Hapus</button>
          <button onClick={() => setIsEdit(false)}>Batal</button>
        </div>
      ) : (
        <div className="w-[50%] m-auto flex mt-2 flex-col items-center justify-center nav-bottom-tulis">
          <button>
            <Link href="/tulis-memo">
              <TbNotes size={35} />
            </Link>
          </button>
          <p className="text-[.8rem]">Buat memo baru</p>
        </div>
      )}
    </div>
  );
};

export default NavBottom;
