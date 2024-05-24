// "use client";

import AppShel from "@/components/layout/appShel";
import CardMemo from "@/components/ui/card-memo";
import { getCatatanUser } from "@/lib/supabase/fetch";
import { cookies } from "next/headers";

const getData = async () => {
  const cookieStore = cookies();
  const theme = cookieStore.get("user");

  if (theme === undefined) {
    return null;
  }

  const user = JSON.parse(theme.value);
  console.log({ user });

  try {
    const result = await getCatatanUser(user.id);

    if (result.status && result.data) {
      if (result.data?.length > 0) {
        const dataShort = result.data.sort((a, b) => a.id - b.id);
        return dataShort;
      }
      return result.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const dataMemo = await getData();
  return (
    <AppShel>
      <div className="p-2 flex flex-col gap-3 w-[95%] m-auto pb-20 lg:w-[70%]">
        {dataMemo?.map((data: any) => (
          <CardMemo
            id={data.id}
            key={data.id}
            judul={data.judul}
            date={data.created_at}
            time_update={data.time_update}
          />
        ))}
      </div>
    </AppShel>
  );
}
