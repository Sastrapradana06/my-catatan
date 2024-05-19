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

const NavMemo = () => {
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
          <button className={``}>
            <RiArrowGoBackLine size={20} />
          </button>
          <button className={``}>
            <RiArrowGoForwardFill size={20} />
          </button>

          <button type="submit">
            <Link href="/">
              <RiCheckLine size={25} color="white" />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavMemo;
