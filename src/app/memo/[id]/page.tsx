"use client";

import NavMemo from "@/components/ui/nav-memo";
import { getCatatanById } from "@/lib/supabase/fetch";
import { updateCatatan } from "@/lib/supabase/update";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RiLoader2Fill } from "react-icons/ri";

export const getDetailCatatan = async (id: string | number) => {
  try {
    const result = await getCatatanById(id);

    console.log({ result });

    if (result.status) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export default function Memo({ params }: { params: { id: string | number } }) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [judulMemo, setJudulMemo] = useState("");
  const [teksMemo, setTeksMemo] = useState("");

  const textareaRef = useRef(null);
  const textareaTeks = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const getDataNow = () => {
    const event = new Date();
    const options: any = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    return event.toLocaleDateString("id-ID", options);
  };

  function setDynamicHeight(ref: any) {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = 25 + textarea.scrollHeight + "px";
    }
  }

  const getDetailCatatan = async (id: string | number) => {
    setIsLoading(true);
    try {
      const result = await getCatatanById(id);

      if (result.status && result.data && result.data.length > 0) {
        const { data } = result;
        setTeksMemo(data[0].teks);
        setJudulMemo(data[0].judul);
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const tes = await updateCatatan(params.id, {
        judul: judulMemo,
        teks: teksMemo,
        time_update: getDataNow(),
      });

      if (tes.status) {
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDetailCatatan(params.id);
    // setDynamicHeight(textareaTeks);
  }, [params.id]);

  return (
    <div className=" absolute z-20 w-full h-[100vh] page-memo bg-[#242424] p-1">
      {isLoading && (
        <div className="w-full h-[100vh] absolute top-0 left-0 flex justify-center items-center z-20 bg-[#02020217]">
          <RiLoader2Fill size={30} className=" animate-spin text-white" />
        </div>
      )}
      <NavMemo
        judulMemo={judulMemo}
        teksMemo={teksMemo}
        setTeksMemo={setTeksMemo}
        addMemo={handleSubmit}
        process={isLoading}
      />

      <div className=" mt-8">
        <div className="w-[90%] m-auto lg:w-[70%]">
          <textarea
            className="bg-transparent w-full text-[1.6rem] flex flex-wrap items-center h-[50px] border-none outline-none mt-6 text-gray-400"
            onInput={() => setDynamicHeight(textareaRef)}
            ref={textareaRef}
            rows={1}
            cols={15}
            value={judulMemo}
            placeholder="Masukkan Judul"
            onChange={(e) => setJudulMemo(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
          />
          <div className=" mt-1 text-[.8rem] text-gray-400">
            <p>
              {getDataNow()} | {teksMemo.length} kata
            </p>
          </div>
          <textarea
            className="bg-transparent w-[100%] text-[1rem] flex flex-wrap items-center h-[50px] outline-none mt-6 text-gray-400 border-none"
            onInput={() => setDynamicHeight(textareaTeks)}
            ref={textareaTeks}
            rows={1}
            cols={15}
            value={teksMemo}
            onChange={(e) => setTeksMemo(e.target.value)}
            onFocus={() => setIsInputFocused(false)}
          />
        </div>
      </div>
    </div>
  );
}
