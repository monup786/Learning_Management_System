import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { GoFileDirectory } from "react-icons/go";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../../App";
import axios from "axios";
import { useEffect } from "react";
import { setCreatorCourseData } from "../../redux/courseSlice";
function CoursesPage() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {userData}=useSelector(state=>state.user);
  const { creatorCourseData } = useSelector((state) => state.course);
  useEffect(()=>{
    const creatorCourses=async()=>{
       try {
          const result= await axios.get(serverUrl +"/api/course/getcreatorcourse" , {withCredentials:true});
          console.log(result.data.courses);
          dispatch(setCreatorCourseData(result.data.courses));
       } catch (error) {
            console.log(error);
           
       }
    }
    creatorCourses();
   },[userData])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-[100%] min-h-screen p-4 sm:p-6 bg-gray-100">
        <div className=" flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 ">
          <div className=" flex items-center justify-center gap-3">
            <FaArrowLeftLong
              className="  top-[4%] left-[2%] w-[22px] h-[22px] cursor-pointer "
              onClick={() => navigate("/dashboard")}
            />
            <h1 className="text-2xl  left-[2%] font-semibold ">
              All created Courses
            </h1>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-2xl mr-5 cousor-pointer hover:bg-gray-500 "
            onClick={() => navigate("/createcourse")}
          >
            Create Course
          </button>
        </div>
        {/* for large screen table  */}
        <div className=" hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="min-w-full text-sm ">
            <thead className="border-b">
              <tr>
                <th className="text-left text-[18px] py-3 px-4">Courses</th>
                <th className="text-left text-[18px] py-3 px-4">Price</th>
                <th className="text-left text-[18px] py-3 px-4">Status</th>
                <th className="text-left text-[18px] py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {creatorCourseData?.map((course, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-3 px-4 flex items-center gap-4 ">
                    {course?.thumbnail ? (
                      <img
                        src={course?.thumbnail}
                        className="w-35 h-25 object-cover rounded-md "
                      />
                    ) : (
                      <GoFileDirectory className="w-25 h-14 object-cover rounded-md " />
                    )}
                    <span className="text-[16px]">{course?.title}</span>
                  </td>

                  {course?.price ? (
                    <td className="px-4 py-3 text-[16px]"> ₹{course?.price}</td>
                  ) : (
                    <td className="px-4 py-3"> ₹ NA</td>
                  )}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        course?.isPublished
                          ? "bg-green-100 text-green-600 text-[16px]"
                          : "bg-red-100 text-red-600 text-[16px]"
                      } `}
                    >
                      {course?.isPublished ? "Published" : "Not Published"}
                    </span>
                  </td>
                  <td className="px-4 py-3 ">
                    <FaEdit className="text-gray-600 text-[25px] hover:text-blue-500 cursor-pointer 
                  " 
                    onClick={()=>navigate(`/editcourse/${course?._id}`)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center text-md text-gray-600 mt-6 sm:text-center ">
            A List of Your recent courses
          </p>
        </div>

        {/* for small screen table  */}
        <div className="md:hidden space-y-4 ml-2 mr-2">
          {creatorCourseData?.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 flex flex-col gap-3"
            >
              <div className="flex gap-4 items-center ">
                {/* <FaEdit className="w-10 h-10 rounded-md object-cover" /> */}
                {course?.thumbnail ? (
                  <img
                    src={course?.thumbnail}
                    className="w-10 h-10 object-cover rounded-md "
                  />
                ) : (
                  <GoFileDirectory className="w-10 h-10 object-cover rounded-md " />
                )}

                <div className="flex-1">
                  <h2 className="font-medium text-sm">{course?.title}</h2>
                  {course?.price ? (
                    <p className="text-gray-600 text-xs mt-1">
                      {course?.price}{" "}
                    </p>
                  ) : (
                    <p className="text-gray-600 text-xs mt-1"> ₹ NA </p>
                  )}
                </div>
                <FaEdit className="text-gray-600 text-[25px] hover:text-blue-500 cursor-pointer" 
                 onClick={()=>navigate(`/editcourse/${course?._id}`)}/>
              </div>
              <span
                className={`w-fit px-3 py-1 text-vs rounded-full 
        ${
          course?.isPublished
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
              >
                {course?.isPublished ? "Published" : "Not Published"}
              </span>
            </div>
          ))}
          <p className="text-center text-sm text-gray-400 mt-4 ">
            A list of Your recent courses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;
