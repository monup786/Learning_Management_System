import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
function MyEnrolledCourses() {
    const userData = useSelector(state => state.user?.userData);
    
    const navigate = useNavigate();
    return (
        <div className='min-h-screen w-full bg-gray-600 px-4 py-9 '>
                <FaArrowLeftLong className='absolute top-[3%] md:top-[6%]  left-[5%] w-[22px] h-[22px] text-white cursor-pointer' 
                onClick={()=>navigate("/")}/>
            <h1 className='text-3xl text-center mt-5 font-bold text-white mb-6'>My All Enrolled Courses</h1>
            {
                userData?.enrolledCourses?.length === 0 ? (
                    <p className='text-gray-600 w-full text-center'>You have Not Purchased any course</p>
                ) : (
                    <div className='flex items-center justify-center flex-wrap gap-[30px]'>
                        {userData?.enrolledCourses?.map((course, index) => (
                            <div key={index} className='bg-white rounded-2xl shadow-md overflow-hidden border  w-[260px] h-[360px] flex flex-col' >
                                <img className='w-full h-40 object-cover' src={course?.thumbnail}  />
                                <div className='p-4'>
                                    <h2 className='text-lg font-semibold text-gray-800 mb-2'>{course?.title}</h2>
                                    <p className='mb-2 text-sm text-gray-600'>{course?.category}</p>
                                    <p className='mb-2 text-sm text-gray-600'>{course?.level}</p>

                                    <h1 className='px-[10px] text-center py-[10px] border-2 bg-black border-black text-white
                            rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer 
                            mt-[30px] hover:bg-gray-600  ' onClick={()=>navigate(`/viewlecture/${course._id}`)}> Watch Now </h1>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default MyEnrolledCourses
