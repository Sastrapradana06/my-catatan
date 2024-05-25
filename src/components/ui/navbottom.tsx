"use client";

import { deleteMultipleCatatan } from "@/lib/supabase/delete";
import { useAppStore } from "@/utils/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TbNotes } from "react-icons/tb";
import { useShallow } from "zustand/react/shallow";
const NavBottom = () => {
  const [isEdit, setIsEdit, selectedId, deleteSelectedId] = useAppStore(
    useShallow((state: any) => [
      state.isEdit,
      state.setIsEdit,
      state.selectedId,
      state.deleteSelectedId,
    ])
  );

  const router = useRouter();

  const handleBatal = () => {
    setIsEdit(false);
    deleteSelectedId();
  };

  const handleDelete = async () => {
    if (confirm("Apakah anda yakin ingin menghapus?")) {
      const result = await deleteMultipleCatatan(selectedId);
      if (result.status) {
        setIsEdit(false);
        deleteSelectedId();
        router.push("/home");
      }
    }
  };

  return (
    <div className="fixed bottom-0 w-full h-[62px]  bg-[#2B2730] nav-bottom-semua">
      {isEdit ? (
        <div className="w-[50%] m-auto flex items-center justify-between nav-bottom-edit mt-5">
          <button onClick={handleDelete}>Hapus</button>
          <button onClick={handleBatal}>Batal</button>
        </div>
      ) : (
        <div className="w-[50%] m-auto flex mt-2 flex-col items-center justify-center nav-bottom-tulis">
          <button>
            <Link href="/tulis-memo">
              <TbNotes size={35} />
            </Link>
          </button>
          <p className="text-[.8rem]">Buat catatan</p>
        </div>
      )}
    </div>
  );
};

export default NavBottom;
