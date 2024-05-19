import AppShel from "@/components/layout/appShel";
import CardMemo from "@/components/ui/card-memo";

export default function Home() {
  return (
    <AppShel>
      <div className="p-2 flex flex-col gap-3 w-[95%] m-auto pb-20 lg:w-[70%]">
        <CardMemo id={1} />
        <CardMemo id={2} />
      </div>
    </AppShel>
  );
}
