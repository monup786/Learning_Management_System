import React from "react";
import { MdOutlineCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
function Logo() {
  return (
    // <div className="w-[100vw] min-h-[90px] flex items-center justify-center flex-wrap mt-7 gap-25 md:mb-[50px]">
    <div className="w-full flex flex-wrap items-center justify-center gap-4 mt-10 mb-10 px-4">

      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#3ea0ca] text-white font-semibold shadow-md hover:shadow-lg transition w-full max-w-[260px] justify-center cursor-pointer">
        <MdOutlineCastForEducation className="w-7 h-7" />
        10k+ online courses
      </div>

      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#3ea0ca] text-white font-semibold shadow-md hover:shadow-lg transition w-full max-w-[260px] justify-center cursor-pointer">
        <SiOpenaccess className="w-7 h-7" />
        lifetime access
      </div>

      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#3ea0ca] text-white font-semibold shadow-md hover:shadow-lg transition w-full max-w-[260px] justify-center cursor-pointer">
        <AiFillDollarCircle className="w-7 h-7" />
        value for money
      </div>

      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#3ea0ca] text-white font-semibold shadow-md hover:shadow-lg transition w-full max-w-[260px] justify-center cursor-pointer">
        <FaUsers className="w-7 h-7" />
        community support
      </div>

    </div>
  );
}

export default Logo;
