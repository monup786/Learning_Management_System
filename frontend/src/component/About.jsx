import React from 'react'
import { TfiLayoutLineSolid } from "react-icons/tfi";
import AboutImage from '../assets/AboutImage.png'
import { BsFillPatchCheckFill } from "react-icons/bs";
function About() {
  return (
    <div className='w-[100vw] lg:h-[70vh] min-h-[50vh] flex flex-wrap items-center justify-center gap-2 mb-[30px]'>
      {/* for image */}
      <div className='lg:w-[40%] md:w-[80%] w-[100%] h-[100%] flex items-center justify-center mt-10 relative'>
        <img className='h-[80%] w-[70%] rounded-2xl' src={AboutImage} />

      </div>

      {/* for about info */}
      <div className='lg:w-[50%] md:w-[70%] w-[100%] h-[100%] flex items-start justify-center flex-col px-[35px] 
        md:px-[80px]'>
        <div className='flex text-[18px] items-center justify-center gap-[20px]'>About Us
          <TfiLayoutLineSolid className='w-[40px] h-[40px]' />

        </div>
        <div className='md:text-[45px] text-[35px] font-semibold'> We integrate Technology with Smarter Learning</div>
        <div className='text-[18px]'>
        Our platform merges the power of AI with expertly crafted educational content to deliver a learning experience like never before. From AI-enhanced recommendations 
        to intuitive dashboards and analytics, every feature is designed to help you learn smarter — not harder.  </div>
        <div className='w-[100%] lg:w-[60%]'>
          <div className='flex items-center justify-between mt-[40px]'>
            <div className='flex items-center justify-center text-[18px] mr-6 gap-[10px]'>
              <BsFillPatchCheckFill className='w-[20px] h-[20px] ' />Simplified Learning </div>
            <div className='flex items-center justify-center text-[18px] gap-[10px]'>
              <BsFillPatchCheckFill className='w-[20px] h-[20px] ' />AI-Driven Learning Tools </div>
                </div>
                 <div className='flex items-center justify-between mt-[40px]'>
            <div className='flex items-center justify-center text-[18px] gap-[10px]'>
              <BsFillPatchCheckFill className='w-[20px] h-[20px] ' />Seamless User Experience </div>
            <div className='flex items-center justify-center text-[18px] gap-[10px]'>
              <BsFillPatchCheckFill className='w-[20px] h-[20px] ' /> Career Growth </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default About
