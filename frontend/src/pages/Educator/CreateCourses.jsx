import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { ArrowLeft } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
function CreateCourses() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading ,setLoading]=useState("");

  const handleCreateCourse = async(req,res)=>{
     setLoading(true);
     try {
      if(!title||!category){
        setLoading(false);
        toast.error("please provide the details to create courses");
        return;
      }
      const result=await axios.post(serverUrl +"/api/course/create",{title,category},{withCredentials:true});
      console.log(result.data);
      navigate("/courses");
      setLoading(false);
      toast.success("Course Created successfully");
     } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
     }
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#3e98ac] px-4 py-10">
      <div className=" bg-white shadow-lg relative rounded-2xl p-8 w-full max-w-md">
        {/* Header */}
        <FaArrowLeftLong className="top-[12%] absolute left-[5%] w-[22px] h-[22px] cursor-pointer" 
        onClick={()=>navigate('/courses')} />
        <h2 className="text-2xl font-semibold text-center mb-6 ">Create Course</h2>
        {/* <div className="w-[22px]" /> placeholder for spacing  */}
      

      {/* Form */}
      <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
        {/* Course Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-black mb-1">
            Course Title
          </label>
          <input
          id="title"
            type="text"
            placeholder="Enter course title"
           
             onChange={(e) => setTitle(e.target.value)}
             value={title}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
             required/>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-black mb-1">
            Category
          </label>
          <select
          id="category"
             onChange={(e) => setCategory(e.target.value)}
             
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
           required>
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
        {/* Submit Button */}
        <button
            onClick={handleCreateCourse}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 cursor-pointer px-4 rounded-md hover:bg-gray-800 transition"
            
          >
            {loading?<ClipLoader size={30} color='white'/>:"Create"}
          </button>
      </form>
      </div>
    </div>
  );
}

export default CreateCourses;
