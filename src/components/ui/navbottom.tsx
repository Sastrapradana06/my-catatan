"use client";

import { deleteMultipleCatatan } from "@/lib/supabase/delete";
import { useAppStore } from "@/utils/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbNotes } from "react-icons/tb";
import { useShallow } from "zustand/react/shallow";
import { MdDelete } from "react-icons/md";
import Alert from "./alert";
import useHandleAlert from "@/app/hooks/useHandleAlert";

const NavBottom = () => {
  const [isModalDelete, setIsModalDelete] = useState(false);
  const { alertStatus, alertData, handleAlert } = useHandleAlert();

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
    setIsModalDelete(false);
    setIsEdit(false);
    deleteSelectedId();
  };

  const handleDelete = async () => {
    const result = await deleteMultipleCatatan(selectedId);
    if (result.status) {
      handleAlert("success", "Berhasil menghapus catatan");
      setIsEdit(false);
      setIsModalDelete(false);
      deleteSelectedId();
    } else {
      handleAlert("gagal", "Gagal menghapus catatan");
    }
  };

  const ModalDelete = () => {
    return (
      <section className="w-full h-[100vh] absolute bg-[#00000048] backdrop-blur-sm flex justify-center items-center z-50 top-0 left-0">
        <div className="relative w-[90%] h-max lg:w-[40%]">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
            <button
              onClick={() => setIsModalDelete(false)}
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
              <div className="w-max h-max m-auto border-2  rounded-full p-1 mb-3">
                <MdDelete size={40} className="text-red-600" />
              </div>
              <h3 className="mb-5 text-lg font-normal text-gray-300 dark:text-gray-300">
                Apakah kamu yakin ingin Menghapus Catatan?
              </h3>
              <button
                onClick={handleDelete}
                title="delete catatan"
                name="delete catatan"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, Im sure
              </button>
              <button
                onClick={handleBatal}
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
      <Alert
        status={alertStatus}
        type={alertData.type}
        message={alertData.message}
      />
      {isModalDelete && <ModalDelete />}
      <div className="fixed bottom-0 w-full h-[62px]  bg-[#2B2730] nav-bottom-semua">
        {isEdit ? (
          <div className="w-[50%] m-auto flex items-center justify-between nav-bottom-edit mt-5">
            {selectedId.length > 0 ? (
              <button
                onClick={() => setIsModalDelete(true)}
                title="show modal"
                name="show modal"
              >
                Hapus
              </button>
            ) : (
              <button
                className="text-gray-400 cursor-not-allowed"
                title="hidden Hapus"
                name="hidden Hapus"
              >
                Hapus
              </button>
            )}
            <button onClick={handleBatal} title="Batal" name="Batal">
              Batal
            </button>
          </div>
        ) : (
          <div className="w-[50%] m-auto flex mt-2 flex-col items-center justify-center nav-bottom-tulis">
            <button title="Buat catatan" name="Buat catatan">
              <Link href="/tulis-memo">
                <TbNotes size={35} />
              </Link>
            </button>
            <p className="text-[.8rem]">Buat catatan</p>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBottom;
