import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Card from "../component/Card.jsx";

function AllCourses() {
  const navigate = useNavigate();
  const courseData = useSelector((state) => state.course);
  const [category, setCategory] = useState([]);
  const [isSidebarVisible,setIsSidebarVisible]=useState(false);
  // const dispatch=useDispatch();
  const [filterCourses, setFilterCourses] = useState([]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((c) => c !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  
  const applyFilter = async () => {
    let courseCopy = (await courseData?.courseData?.course?.slice()) || [];
    if (category.length > 0) {
      courseCopy = await courseCopy.filter((c) =>
        category.includes(c.category)
      );
    }

    await setFilterCourses(courseCopy);
  };
  useEffect(() => {
    if (courseData?.courseData?.course) {
      setFilterCourses(courseData.courseData.course);
    }
  }, [courseData]);

  
  useEffect(() => {
    applyFilter();
  }, [category]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
        <button className="fixed top-20 left-4 z-50 bg-orange-500 text-white px-3 py-1 rounded-2xl md:hidden
        border-2 border-black" onClick={()=>setIsSidebarVisible(prev=>!prev)}>
     {isSidebarVisible ? 'Hide' : 'Show'} Filters
        </button>

      {/* sidebar */}

      <aside
        className={`w-[280px] h-screen  bg-blue-300 fixed top-0 left-0 p-6 
        py-[130px] border-r border-black shadow-md transition-transform duration-300 z-5
        ${isSidebarVisible ? "translate-x-0" :"-translate-x-full"} md:block md:translate-x-0`}
      >
        <h2 className="text-xl  font-bold flex mt-8 items-center justify-center  gap-2 text-black mb-6">
          <FaArrowLeftLong
            className="mr-1 cursor-pointer"
            onClick={() => navigate("/")}
          />
          Filter using Category
        </h2>
        <form
          className="space-y-4 text-sm bg-gray-600 border-white text-white border p-[20px] rounded-2xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <button
            className="px-[40px] py-[10px] bg-orange-500  text-black rounded-[10px] text-[17px] font-bold
             flex items-center justify-center gap-2 cursor-pointer"   onClick={()=>navigate('/search')}
          >
            Ask To AI <FaSearch className="w-[20px] h-[20px] hidden lg:block" />
          </button>
          <label className=" flex text-[17px] items-center gap-3 cursor-pointer hover:text-gray-300 transition">
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"App Development"}
            />
            App Development
          </label>
          <label className=" flex text-[17px] items-center gap-3 cursor-pointer hover:text-gray-300 transition">
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"Web Development"}
            />
            Web Development
          </label>
          <label className=" flex text-[17px] items-center gap-3 cursor-pointer hover:text-gray-300 transition">
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"AI/ML"}
            />
            AI/ML
          </label>
          <label className=" flex text-[17px] items-center gap-3 cursor-pointer hover:text-gray-300 transition">
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"Data Science"}
            />
            Data Science
          </label>
          <label className=" flex text-[17px] items-center gap-3 cursor-pointer hover:text-gray-300 transition">
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"Data Analytics"}
            />
            Data Analytics
          </label>
          <label className=" flex text-[17px] items-center gap-3 cursor-pointer hover:text-gray-300 transition">
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"UI/UX Course"}
            />
            UI/UX Course
          </label>
          <label className=" flex text-[17px] items-center gap-3 cursor-pointer hover:text-gray-300 transition">
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"Ethical Hacking"}
            />
            Ethical Hacking
          </label>
          <label className=" flex text-[17px] items-center gap-3 cursor-pointer hover:text-gray-300 transition">
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"AI Tools"}
            />
            AI Tools
          </label>
          <label className=" flex text-[17px] items-center gap-3 cursor-pointer hover:text-gray-300 transition">
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"Others"}
            />
            Others
          </label>
        </form>
      </aside>
      <main
        className="w-full min-h-screen bg-gray-400 transition-all duration-300 
        py-[130px] md:pl-[300px] flex items-start justify-center
        md:justify-start flex-wrap gap-6 px-[13px]  "
      >
        {Array.isArray(filterCourses) && filterCourses.length > 0 ? (
          filterCourses.map((course, index) => (
            <Card className="mx-auto"
              key={index}
              thumbnail={course.thumbnail}
              title={course.title}
              category={course.category}
              price={course.price}
              id={course._id}
              reviews={course.reviews}
            />
          ))
        ) : (
          <div className="flex items-center justify-center w-full  overflow-hidden">
            {" "}
            <h1 className="text-center text-lg font-semibold text-black mt-60">No Course Found Related to this Category</h1>
           
          </div>
        )}
      </main>
    </div>
  );
}

export default AllCourses;
