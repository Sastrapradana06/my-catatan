"use client";

import Link from "next/link";
import useHandleInput from "./hooks/useHandleInput";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import LoadingBtn from "@/components/ui/loading-btn";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [input, handleChange] = useHandleInput({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setMessage("");
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: input.email,
        password: input.password,
        redirect: false,
      });

      console.log("Response:", res);

      if (res) {
        if (res.ok || res.status == 200) {
          router.push("/home");
        } else {
          setMessage("Harap periksa kembali email dan password");
          console.log("Login failed:", res.error);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center gap-4">
      <div className="w-[90%] h-max">
        <div className="w-max h-max m-auto flex items-center gap-2">
          <img
            src="/book.svg"
            alt="img_book"
            className="w-[50px] h-[50px] object-cover"
          />
          <p className="font_judul text-[1.8rem] font-semibold">Mycatatan</p>
        </div>
        <form
          className="w-full h-max mt-6 lg:w-[60%] lg:m-auto"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Masukkan Email
            </label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              className="shadow-sm outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@gmail.com"
              required={true}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Masukkan Password
            </label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              className="shadow-sm outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required={true}
            />
          </div>
          <div className="w-full h-max mb-5">
            <p className="text-red-500 font-semibold text-[.9rem] italic">
              {message}
            </p>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="text-white  outline-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center gap-1"
          >
            <LoadingBtn size={22} isLoading={isLoading} />
            Login
          </button>
        </form>

        <div className="w-full h-max flex items-center gap-2 mt-6 lg:w-[60%] lg:mt-8 lg:m-auto">
          <p className="text-[.9rem]">Belum memiliki akun?</p>
          <Link href={"/register"}>
            <button className="text-[.9rem] py-1 px-3 rounded-md bg-pink-600 hover:bg-pink-700 ">
              Buat Akun
            </button>
          </Link>
          {/* <Link href={"/home"}>
            <button className="text-[.9rem] py-1 px-3 rounded-md bg-violet-600 hover:bg-violet-700 ">
              Home
            </button>
          </Link> */}
          {/* <button
            className="text-[.9rem] py-1 px-3 rounded-md bg-orange-600 hover:bg-orange-700 "
            onClick={() => signOut()}
          >
            SignOut
          </button> */}
        </div>
      </div>
    </div>
  );
}
