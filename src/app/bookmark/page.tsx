"use client";

import AppShel from "@/components/layout/appShel";
import CardMemo from "@/components/ui/card-memo";
import SkeletonCard from "@/components/ui/skeleton";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type CustomUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type CustomSession = Session & {
  user: CustomUser;
};

export default function Bookmark() {
  const [memo, setMemo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession() as { data: CustomSession | null };
  const getData = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/get-memo?query=${data?.user?.id}`);

    if (res.status == 200) {
      const data = await res.json();
      setMemo(data.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <AppShel>
      {isLoading ? (
        <SkeletonCard />
      ) : memo.length > 0 ? (
        <div className="p-2 flex flex-col gap-3 w-[95%] m-auto pb-10 lg:w-[70%]">
          {memo.map((data: any) => (
            <CardMemo
              id={data.id}
              key={data.id}
              judul={data.judul}
              date={data.created_at}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-max text-center">Pengingat tidak ada</div>
      )}
    </AppShel>
  );
}
