"use client";

import AppShel from "@/components/layout/appShel";
import CardMemo from "@/components/ui/card-memo";
import SkeletonCard from "@/components/ui/skeleton";
import { getCatatanUser } from "@/lib/supabase/fetch";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useAppStore } from "@/utils/store";
import { useShallow } from "zustand/react/shallow";

// import { cookies } from "next/headers";
import { useEffect, useState } from "react";

type CustomUser = {
  id: string | any;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type CustomSession = Session & {
  user: CustomUser;
};

export default function Home() {
  const [dataMemo, setDataMemo] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession() as { data: CustomSession | null };
  const [setListIdBookmark] = useAppStore(
    useShallow((state: any) => [state.setListIdBookmark])
  );

  const getData = async () => {
    setIsLoading(true);

    const result = await getCatatanUser(data?.user?.id);

    if (result.status && result.data) {
      if (result.data?.length > 0) {
        const dataShort = result.data.sort((a, b) => a.id - b.id);
        const filterBookmark = dataShort.filter(
          (item: any) => item.is_bookmark === true
        );
        const ids = filterBookmark.map((item: any) => item.id);
        setListIdBookmark(ids);
        setDataMemo(dataShort);
      } else {
        setDataMemo([]);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [data]);

  // console.log({ isLoading, dataMemo });

  return (
    <AppShel>
      {isLoading ? (
        <SkeletonCard />
      ) : dataMemo.length > 0 ? (
        <div className="p-2 flex flex-col gap-3 w-[95%] m-auto pb-10 lg:w-[70%]">
          {dataMemo.map((data: any) => (
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
          Buat catatan pertama anda
        </div>
      )}
    </AppShel>
  );
}
