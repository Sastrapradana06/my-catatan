"use client";

import CardMemo from "@/components/ui/card-memo";
import SkeletonCard from "@/components/ui/skeleton";
import { getCatatanUser } from "@/lib/supabase/fetch";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
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

export default function ResultSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataSearch, setdataSearch] = useState<any>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { data } = useSession() as { data: CustomSession | null };

  const getData = async () => {
    setIsLoading(true);

    const result = await getCatatanUser(data?.user?.id);

    if (result.status && result.data) {
      if (result.data?.length > 0) {
        const filterData = result.data.filter((item: any) => {
          const byJudul = item.judul
            .toLowerCase()
            .includes(query?.toLowerCase());

          const byTeks = item.teks.toLowerCase().includes(query?.toLowerCase());

          return byJudul || byTeks;
        });
        setdataSearch(filterData);
      } else {
        setdataSearch([]);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [data, query]);

  return (
    <div className="w-full h-max flex flex-col gap-4 ">
      {isLoading ? (
        <SkeletonCard />
      ) : dataSearch.length > 0 ? (
        <div className="p-2 flex flex-col gap-3 w-full m-auto lg:w-[70%]">
          {dataSearch.map((data: any) => (
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
          Tidak ada catatan yang ditemukan
        </div>
      )}
    </div>
  );
}
