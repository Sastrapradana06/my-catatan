"use client";

import NavMemo from "@/components/ui/nav-memo";
import { getDataNow, getFormattedDateTime } from "@/utils/utils";
import { useRef, useState, RefObject, useEffect } from "react";

export default function TulisMemo() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [judulMemo, setJudulMemo] = useState("");
  const [teksMemo, setTeksMemo] = useState("");

  const textareaRef = useRef(null);
  const textareaJudul = useRef(null);
  const dateNow = getDataNow();

  function setDynamicHeight(ref: RefObject<HTMLTextAreaElement>) {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }

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
      />

      <div className=" mt-8">
        <form className="w-[90%] m-auto lg:w-[70%]">
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
              {dateNow} | {teksMemo.length} kata
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
        </form>
      </div>
    </div>
  );
}
