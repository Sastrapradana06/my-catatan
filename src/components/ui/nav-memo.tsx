"use client";
import {
  RiCheckLine,
  RiArrowGoBackLine,
  RiArrowGoForwardFill,
  RiDeleteBin6Line,
} from "react-icons/ri";
import {
  BsArrowLeft,
  BsBookmarkStar,
  BsBookmarkStarFill,
} from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";

const NavMemo = ({
  judulMemo,
  teksMemo,
  setTeksMemo,
}: {
  judulMemo: string;
  teksMemo: string;
  setTeksMemo: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [deletedValue, setDeletedValue] = useState("");

  const handleDeleteTeks = () => {
    const updatedValue = teksMemo.substring(0, teksMemo.length - 1);
    const deleteTeks = teksMemo.slice(teksMemo.length - 1);
    setTeksMemo(updatedValue);
    setDeletedValue((prevValue) => prevValue + deleteTeks);
  };

  const handleUndo = () => {
    const newTeksMemo = deletedValue.split("").reverse().join("");
    setTeksMemo((prevValue) => prevValue + newTeksMemo);
    setDeletedValue("");
  };

  return (
    <div className=" mt-4">
      <div className=" w-[90%] m-auto h-[30px] flex justify-between items-center lg:w-[70%]">
        <div className=" flex items-center">
          <button>
            <Link href="/home">
              <BsArrowLeft size={25} />
            </Link>
          </button>
        </div>
        <div className="flex gap-4 lg:gap-6">
          {/* {detailMemo.length !== 0 && 
          <div className="flex gap-4">
              <button onClick={addBookMark}>
                  {!isBookMark ? (
                    <BsBookmarkStar size={23}/>
                  ) : (
                    <BsBookmarkStarFill size={23} color="orange" />
                  )}
              </button>
              <button onClick={deletedMemo}>
                <Link to='/'>
                  <RiDeleteBin6Line size={25} color="crimson"/>
                </Link>
              </button>
          </div>
          }  */}
          <button
            className={``}
            onClick={handleDeleteTeks}
            disabled={teksMemo === ""}
          >
            <RiArrowGoBackLine
              size={20}
              className={
                teksMemo == ""
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-white cursor-pointer"
              }
            />
          </button>
          <button
            className={``}
            onClick={handleUndo}
            disabled={deletedValue === ""}
          >
            <RiArrowGoForwardFill
              size={20}
              className={
                deletedValue == ""
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-white cursor-pointer"
              }
            />
          </button>

          {judulMemo.length > 0 && teksMemo.length > 0 && (
            <button type="submit">
              <Link href="/">
                <RiCheckLine size={25} color="white" />
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavMemo;
