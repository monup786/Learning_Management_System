import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { AiOutlineOpenAI } from "react-icons/ai";
import { SiGoogledataproc } from "react-icons/si";
import { SiOpenaigym } from "react-icons/si";
function ExploreCourses() {
  const navigate = useNavigate();
  return (
    <div className='w-[100%] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center
     justify-center gap-4 px-[30px]'>
      {/* Left Side/top div   */}
     <div className='w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-center justify-center gap-3 md:px-[40px] px-[20px] text-center'>
  <span className='text-[35px] text-orange-500 font-semibold'>Explore</span>
  <span className='text-[35px] text-orange-500 font-semibold'>Our Courses</span>
  <p className='text-[17px]'>
    we provide best courses which can build the good knowledge and skills for your future
  </p>
  <button
    className='px-[20px] py-[10px] cursor-pointer border-2 bg-blue-500 text-white rounded-[10px] text-[18px] flex gap-2 mt-[20px]'
    onClick={() => navigate("/allcourses")}
  >
    Explore Courses
  </button>
</div>
      {/* Right Side */}
      <div className='w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] 
        gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]'>
        <div className='w-[100px] h-[130px] font-bold text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <TbDeviceDesktopAnalytics className='w-[60px] h-[60px] mx-auto text-blue-500' />
          </div>
             Web Development
        </div>
        <div className='w-[100px] h-[130px] font-bold text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <SiViaplay className='w-[60px] h-[60px] mx-auto text-blue-500' />
          </div>
             Data Analytics 
        </div>
        <div className='w-[100px] h-[130px] font-bold text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <LiaUikit className='w-[60px] h-[60px] mx-auto text-blue-500' />
          </div>
             UI/UX Design
        </div>
        <div className='w-[100px] h-[130px] font-bold text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <MdAppShortcut className='w-[60px] h-[60px] mx-auto text-blue-500' />
          </div>
             App Development
        </div>

        <div className='w-[100px] h-[130px] font-bold text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <FaHackerrank className='w-[60px] h-[60px] mx-auto text-blue-500' />
          </div>
             Ethical Hacking
        </div>
        <div className='w-[100px] h-[130px] font-bold text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <AiOutlineOpenAI className='w-[60px] h-[60px] mx-auto text-blue-500' />
          </div>
             AI/ML 
        </div>
        <div className='w-[100px] h-[130px] font-bold text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <SiGoogledataproc className='w-[60px] h-[60px] mx-auto text-blue-500' />
          </div>
             Data Science
        </div>
        <div className='w-[100px] h-[130px] font-bold text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <SiOpenaigym className='w-[60px] h-[60px] mx-auto text-blue-500' />
          </div>
             AI Tools
        </div>
      </div>
    </div>
  )
}

export default ExploreCourses