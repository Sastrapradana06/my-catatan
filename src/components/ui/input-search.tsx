"use client";

import { VscBook } from "react-icons/vsc";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InputSearch() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleButton = () => {
    router.push(`/cari-memo?q=${inputValue}`);
  };

  return (
    <div className="flex items-center max-w-sm mx-auto">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <VscBook size={20} fill="white" />
        </div>
        <input
          type="text"
          id="simple-search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="outline-none bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full ps-10 p-2.5 "
          placeholder="cari memo..."
          required
        />
      </div>
      {inputValue.length <= 3 ? (
        <button
          onClick={handleButton}
          className="p-2.5 ms-2 text-sm font-medium cursor-not-allowed text-white rounded-lg border border-pink-700  focus:ring-4 focus:outline-none  bg-pink-800 hover:bg-pink-900 focus:ring-pink-800"
        >
          <BiSearch size={20} className="text-gray-400" />
          <span className="sr-only">Search</span>
        </button>
      ) : (
        <button
          onClick={handleButton}
          className="p-2.5 ms-2 text-sm font-medium text-white bg-pink-700 rounded-lg border border-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
        >
          <BiSearch size={20} fill="white" />
          <span className="sr-only">Search</span>
        </button>
      )}
    </div>
  );
}
