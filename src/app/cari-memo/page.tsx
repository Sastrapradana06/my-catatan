import InputSearch from "@/components/ui/input-search";
import ResultSearch from "./result-search";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { Suspense } from "react";

export default function CariMemo() {
  return (
    <main className="w-full min-h-[100vh] max-h-max relative">
      <div className="w-[90%] m-auto h-max mt-3">
        <Link href="/home" className="text-[1.5rem] font-judul text-pink-600">
          <BsArrowLeft size={25} fill="white" />
        </Link>
      </div>
      <div className="w-[90%] m-auto h-max mt-4">
        <InputSearch />
      </div>
      <div className="w-[90%] m-auto h-max mt-8 ">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <ResultSearch />
        </Suspense>
      </div>
    </main>
  );
}
