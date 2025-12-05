import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { serverUrl } from "../../App";
import img3 from "../../assets/img3.png";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/courseSlice";
const EditCourse = () => {
  const navigate = useNavigate();
  const thumb = useRef();
  const { courseId } = useParams();
  const [isPublished, setIsPublished] = useState(false);
  const [selectCourse, setSelectCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [frontendImage, setFrontendImage] = useState(img3);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const dispatch = useDispatch();
  const { courseData } = useSelector(state => state.course);


  const getCourseById = async () => {
    try {
      const result = await axios.get(
        serverUrl + `/api/course/getcoursebyId/${courseId}`,
        { withCredentials: true }
      );
      setSelectCourse(result.data.course);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseById();
  }, []);

  useEffect(() => {
    if (selectCourse) {
      setTitle(selectCourse.title || "");
      setSubTitle(selectCourse.subTitle || "");
      setDescription(selectCourse.description || "");
      setLevel(selectCourse.level || "");
      setCategory(selectCourse.category || "");
      setPrice(selectCourse.price || "");
      setFrontendImage(selectCourse.thumbnail || img3);
      setIsPublished(selectCourse?.isPublished);
    }
  }, [selectCourse]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleEditCourse = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("isPublished", isPublished);
    if (backendImage) {
      formData.append("thumbnail", backendImage);
    }
    try {
      const result = await axios.post(
        serverUrl + `/api/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true }
      );
      console.log(result.data);
      // console.log(courseData);
      const updateData = result.data;
      if (updateData.isPublished) {
        const updateCourses = courseData.course.map(c => c._id === courseId ? updateData : c);
        if (!courseData.course.some(c => c._id === courseId)) {
          updateCourses.push(updateData)
        }
        dispatch(setCourseData({ course: updateCourses }));

      }
      else {
        console.log(courseData);
        const filterCourses = courseData.course.filter(c => c._id !== courseId);
        dispatch(setCourseData({ course: filterCourses }));
      }
      await axios.get(`${serverUrl}/api/course/getpublished`, {
        withCredentials: true,
      }).then(res => {
        dispatch(setCourseData(res.data));
      });
      setLoading(false);
      navigate("/courses");
      toast.success("course Updated successfully");
    } catch (error) {
      console.log("Edit course error:", error);
      setLoading(false);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
  const handleRemoveCourse = async () => {
    setLoading1(true);
    try {
      const result = await axios.delete(serverUrl + `/api/course/delete/${courseId}`, { withCredentials: true })
      console.log(result.data);
      const filterCourses = courseData.course.filter(c => c._id !== courseId);
      dispatch(setCourseData({ course: filterCourses }));
      setLoading1(false);
      toast.success("course Deleted successfully");
      navigate("/courses");
    } catch (error) {
      console.log("remove course error ", error);
      setLoading1(false);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
      else {
        toast.error("Something went wrong. Please try again.");
      }

    }
  }
  return (
     <div className="min-h-screen bg-gray-600 py-10 px-4">
    <div className="max-w-4xl mx-auto bg-white p-6 mt-10  rounded-lg shadow-lg  ">
      {/* <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] md:w-[60%]"> */}
      {/* Header */}
      <div className="flex justify-between items-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative">
        <FaArrowLeftLong
          className="top-[20%] md:top-[20%] absolute
            left-[0] md:left-[2%] cursor-pointer w-[22px] h-[22px]  "
          onClick={() => navigate("/courses")}
        />
        <h2 className="text-xl font-semibold md:pl-[60px] ">
          Add Course Information
        </h2>
        <div className="space-x-2 space-y-2">
          <button
            onClick={() => navigate(`/createlecture/${selectCourse?._id}`)}
            className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
          >
            All lectures
          </button>
        </div>
      </div>
      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>
        <div className="space-x-2 space-y-2">
          {!isPublished ? (
            <button
              className="bg-[#0de8a3] text-black px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer"
              onClick={() => setIsPublished((prev) => !prev)}
            >
              Click to Publish
            </button>
          ) : (
            <button
              className="bg-red-200 text-black px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer"
              onClick={() => setIsPublished((prev) => !prev)}
            >
              Click to UnPublish
            </button>
          )}
          <button className="bg-[#e88d0d] text-black px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
            onClick={handleRemoveCourse}>
            {loading1 ? <ClipLoader size={30} color={'white'} /> : "Delete Course"}
          </button>
        </div>
        <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm mt-3 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              // value={courseData.title}
              // onChange={handleChange}
              placeholder="Course Title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          {/* Subtitle */}
          <div>
            <label
              htmlFor="subtitle"
              className="block text-sm font-medium mb-1"
            >
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              // value={courseData.subtitle}
              // onChange={handleChange}
              placeholder="Subtitle"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              onChange={(e) => setSubTitle(e.target.value)}
              value={subTitle}
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              // value={courseData.description}
              // onChange={handleChange}
              placeholder="Course description"
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          {/* Category, Level, Price */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-1"
              >
                Category
              </label>
              <select
                id="category"
                // value={courseData.category}
                // onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="">Select category</option>
                <option value="App development">App Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Data Science">Data Science</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="UI UX Designing">UI UX Designing </option>
                <option value="Web Development">Web Development</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="level" className="block text-sm font-medium mb-1">
                Course Level
              </label>
              <select
                id="level"
                // value={courseData.level}
                // onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                onChange={(e) => setLevel(e.target.value)}
                value={level}
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="price" className="block text-sm font-medium mb-1">
                Course Price (INR)
              </label>
              <input
                type="number"
                id="price"
                // value={courseData.price}
                // onChange={handleChange}
                placeholder="₹"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
          </div>
          {/* course thumbnail */}
          <div>
            <label htmlFor="" className="block text-sm font-medium mb-1">
              Course Thumbnail
            </label>
            <div className="border border-gray-300 rounded-lg flex flex-col items-center justify-start p-6 relative">
              <img
                src={frontendImage}
                className="w-[20%] h-[20%] object-cover rounded-lg text-gray-400 cursor-pointer"
                onClick={() => thumb.current.click()}
              />

              <label
                htmlFor="thumbnail"
                className="absolute top-1 right-1 bg-gray-200 rounded-full p-1 cursor-pointer hover:bg-gray-300"
              >
                <Pencil size={18} />
              </label>
              <input
                id="thumbnail"
                type="file"
                ref={thumb}
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-center gap-30 mt-6">
            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="px-5 font-bold py-2 rounded-lg border cursor-pointer border-black  text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 cursor-pointer rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={handleEditCourse}

            >
              {loading ? <ClipLoader size={30} color='white' /> : "Save"}

            </button>
          </div>
        </form>
      </div>
    </div>
     </div>
  );
};

export default EditCourse;
