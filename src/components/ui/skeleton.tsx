const SkeletonCard = () => {
  return (
    <div className="h-[100px] w-[95%] m-auto  lg:w-[70%] rounded-xl bg-gray-300 animate-pulse flex items-center justify-between lg:h-[130px]">
      <div className="p-3 w-[70%]">
        <div className="h-[30px] bg-gray-400 rounded w-full overflow-hidden"></div>
        <div className="h-[14px] bg-gray-400 rounded mt-2 w-1/2"></div>
      </div>
      <div className="p-1 h-[60px] flex flex-col justify-between items-end mr-2">
        <div className="h-[14px] bg-gray-400 rounded w-[60px]"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
