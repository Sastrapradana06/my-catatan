"use client";

import NavMemo from "@/components/ui/nav-memo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState, RefObject, useEffect } from "react";

export default function TulisMemo() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [judulMemo, setJudulMemo] = useState("");
  const [teksMemo, setTeksMemo] = useState("");

  const textareaRef = useRef(null);
  const textareaJudul = useRef(null);
  const { data: users } = useSession();
  const router = useRouter();

  const getDataNow = () => {
    const event = new Date();
    const options: any = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return event.toLocaleDateString("id-ID", options);
  };

  function setDynamicHeight(ref: RefObject<HTMLTextAreaElement>) {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }

  const hanldeSubmit = async () => {
    setIsLoading(true);
    try {
      const data = {
        judul: judulMemo,
        teks: teksMemo,
        username: users?.user?.name,
        user_id: users?.user?.id,
        time_update: "",
      };

      const res = await fetch("/api/add-memo", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        router.push("/home");
      } else {
        confirm("Gagal menambahkan catatan");
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setDynamicHeight(textareaRef);
    setDynamicHeight(textareaJudul);
  }, []);

  return (
    <div className=" absolute z-20 w-full h-[100vh] page-memo bg-[#242424] p-1">
      <NavMemo
        judulMemo={judulMemo}
        teksMemo={teksMemo}
        setTeksMemo={setTeksMemo}
        addMemo={hanldeSubmit}
        process={isLoading}
      />

      <div className=" mt-8">
        <div className="w-[90%] m-auto lg:w-[70%]" onSubmit={hanldeSubmit}>
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
            onInput={() => setDynamicHeight(textareaJudul)}
            ref={textareaJudul}
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
