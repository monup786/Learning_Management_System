import React from 'react'
import LogoFooter from '../assets/LogoFooter.png'
import { useNavigate } from 'react-router-dom'
function Footer() {
  const navigate = useNavigate();
  return (
    <div className='bg-gray-400 text-black py-10 px-6 ' >
      <div className='max-w-7xl mx-auto flex lg:items-center items-start justify-center gap-[40px] 
       lg:gap-[150px] flex-col lg:flex-row'>
        <div className='lg:w-[40%] md:w-[50%] w-[100%] '>
          <img src={LogoFooter} className='h-20 mb-3 rounded-2xl ' />
          <h2 className='text-xl font-bold text-black mb-3 '>LearnHub</h2>
          <p className='text-md'> AI-Powered Learning Platform to help you grow smarter. Learn anything,anytime, anywhere</p>
        </div>
        <div className='lg:w-[30%] md:w-[100%]'>
          <div className='text-black text-lg font-semibold mb-2 '>Quick Links</div>
          <ul className='text-sm space-y-1'>
            <li className='hover:text-white cursor-pointer text-md' onClick={() => navigate('/allcourses')}>All Courses</li>
            <li className='hover:text-white cursor-pointer text-md' onClick={() => navigate('/')}>Home</li>
            <li className='hover:text-white cursor-pointer text-md' onClick={() => navigate('/login')}>Login</li>
            <li className='hover:text-white cursor-pointer text-md' onClick={() => navigate("/profile")}>My Profile</li>

          </ul>

        </div>

         <div className='lg:w-[30%] md:w-[100%]'>
          <div className='text-black text-lg font-semibold mb-2 '>All Category Courses</div>
          <ul className='text-sm space-y-1'>
            <li className='  text-md'  >Design & Creative Learning</li>
            <li className='  text-md' >Data & Analytics Paths</li>
            <li className='  text-md'  >Personal Dashboard Overview</li>
            <li className='  text-md' >Access Course Library</li>

          </ul>

        </div>

      </div>
      <div className='border-t border-gray-500 mt-10 pt-5 text-lg text-center text-black'>
        @ {new Date().getFullYear()} LearnHub. All Rights reserved.
      </div>
    </div>
  )
}

export default Footer
