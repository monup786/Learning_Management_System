import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import {BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis,Bar,Tooltip} from "recharts";
function Dashboard() {
    const {userData}=useSelector((state)=>state.user);
    const {creatorCourseData}=useSelector((state)=>state.course)
    const CourseProgressData = creatorCourseData?.map((course)=>({
      name:course.title?.slice(0,10) + "...",
      lectures:course.lectures?.length || 0
    })) || [];
    const EnrollData=creatorCourseData?.map((course)=>({
      name:course.title.slice(0,10) + "...",
      Enrolled:course.enrolledStudents?.length || 0
    })) || [];
    const navigate=useNavigate();

    const totalEarning=creatorCourseData?.reduce((sum,course)=>{
      const studentCount= course.enrolledStudents?.length || 0;
      const courseRevenue = course.price ? course.price * studentCount :0
      return sum + courseRevenue;
    },0) || 0
  return (
    <div className='flex min-h-screen '>
     <FaArrowLeftLong className='absolute left-[24%]   top-[7%]  w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate('/')}/>
        <div className='w-full px-6 py-10 bg-gray-600 space-y-10'>
       
          {/* main section */}
          <div className='max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row
            items-center gap-6'  >
           <img src={userData?.photoUrl || userData?.name.slice(0,1).toUpperCase()} className='
           w-30 h-30 rounded-full object-cover border-4 cursor-pointer border-black shadow-md ' alt="Educator
           " onClick={()=>navigate('/profile')}/>
           <div className='text-center md:text-left mb-5 space-y-1'>
            <h1 className='text-2xl font-semibold text-gray-500 mt-5'>Welcome , {userData?.name || "Educator"}</h1>
            <h1 className='text-xl font-semibold text-gray-500'> Total Earning : ₹{totalEarning.toLocaleString()} </h1>
            <p className='text-gray-600 text-[16px]'>{userData?.description || "Create Your courses "}</p>
            <h1 className=' px-[10px] text-center py-[10px] border-2 bg-blue-500 
            text-white mt-3 rounded-[10px] text-[15px] flex items-center justify-center cursor-pointer' 
             onClick={()=>navigate("/courses")}>Create Course</h1>
           </div>
          </div>
           {/* graph section */}
           <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>

              {/* for course progress graph */}
              <div className='bg-white rounded-lg shadow-lg p-6'>
                <h2 className='text-lg font-semibold mb-4'>Course Lectures's Progress</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={CourseProgressData}>
                     <CartesianGrid strokeDasharray="3 3"/>
                         <XAxis dataKey="name"/>
                         <YAxis />
                         <Tooltip/>
                         <Bar dataKey="lectures" fill='orange' radius={[10,10,0,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* enrolled data  */}
               <div className='bg-white rounded-lg shadow-lg p-6'>
                <h2 className='text-lg font-semibold mb-4'>Students Enrolled in Courses</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={EnrollData}>
                     <CartesianGrid strokeDasharray="3 3"/>
                         <XAxis dataKey="name"/>
                         <YAxis />
                         <Tooltip/>
                         <Bar dataKey="Enrolled" fill='orange' radius={[10,10,0,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>
        </div>
    </div>
  )
}

export default Dashboard