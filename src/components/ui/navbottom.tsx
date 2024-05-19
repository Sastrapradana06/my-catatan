import Link from "next/link";
import { TbNotes } from "react-icons/tb";
const NavBottom = () => {
  return (
    <div className="fixed bottom-0 w-full h-[62px]  bg-[#2B2730] nav-bottom-semua">
      <div className="w-[50%] m-auto flex mt-2 flex-col items-center justify-center nav-bottom-tulis">
        <button>
          <Link href="/tulis-memo">
            <TbNotes size={35} />
          </Link>
        </button>
        <p className="text-[.8rem]">Buat memo baru</p>
      </div>
    </div>
  );
};

export default NavBottom;
