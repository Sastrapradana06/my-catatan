import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center gap-4 relative">
      <h1 className="font_judul">Tes</h1>
      <button>
        <Link href="/home">Home</Link>
      </button>
    </div>
  );
}
