"use client";

import CardMemo from "@/components/ui/card-memo";
import SkeletonCard from "@/components/ui/skeleton";
import { getCatatanUser } from "@/lib/supabase/fetch";
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

type MemoType = {
  id: string | number;
  judul: string;
  created_at: string;
  time_update: string;
  is_bookmark: boolean;
};

export default function ListBookmark() {
  const [memo, setMemo] = useState<MemoType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession() as { data: CustomSession | null };
  const getData = async () => {
    if (!data?.user?.id) {
      return;
    }
    setIsLoading(true);
    const result = await getCatatanUser(data?.user?.id);

    if (result.status && result.data) {
      if (result.data.length > 0) {
        const filterBookmark = result.data.filter(
          (item: any) => item.is_bookmark === true
        );
        if (filterBookmark.length > 0) {
          setMemo(filterBookmark);
        }
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <>
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
              time_update={data.time_update}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-max text-center">
          Tidak ada catatan yang ditandai
        </div>
      )}
    </>
  );
}
