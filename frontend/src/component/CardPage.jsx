import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card.jsx";

function CardPage() {
  const { courseData } = useSelector((state) => state.course);

  const [popularCourses, setPopularCourses] = useState([]);
  useEffect(() => {
    // Fix: handle both array or object structure
    if (Array.isArray(courseData)) {
      setPopularCourses(courseData);
    } else if (courseData?.course && Array.isArray(courseData.course)) {
      setPopularCourses(courseData.course);
    } else {
      setPopularCourses([]);
    }
  }, [courseData]);

  return (
    <div className="relative flex items-center justify-center flex-col ">

      <h1 className="md:text-[45px] text-[30px] font-semibold text-center mt-[20px] mb-6 px-[20px]">
        {" "}
        Our All Courses{" "}
      </h1>
      <span className="lg:w-[50%] md:w-[80%] text-[18px] text-center text-gray-800  px-[10px]">
        Explore our complete collection of industry-relevant courses designed to help you build real skills
         and achieve your career goals. Whether you're starting your learning journey or looking to upskill
          in the latest technologies, our courses are structured with hands-on projects, expert guidance, and
           practical knowledge. From programming and design to data, AI, and emerging tech, every course is 
           crafted to prepare you for real-world challenges. Start learning at your own pace and unlock endless 
           opportunities for personal and professional growth.
      </span>
      <div
        className="w-[100%] min-h-[65vh] flex items-center justify-center flex-wrap gap-[60px] px-5
      lg:p-[20px] md:p-[30px]  mb-[10px] mt-[25px]"
      >
        {popularCourses?.map((course, index) => (
          <Card
            key={index}
            thumbnail={course.thumbnail}
            title={course.title}
            price={course.price}
            category={course.category}
            id={course._id}
            reviews={course.reviews}
          />
        ))}
      </div>
    </div>
  );
}

export default CardPage;
