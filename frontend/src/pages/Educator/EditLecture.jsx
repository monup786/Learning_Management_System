import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../App";
import { setLectureData } from "../../redux/lectureSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
function EditLecture() {
  const navigate = useNavigate();
  const { courseId, lectureId } = useParams();
  const { lectureData } = useSelector(state => state.lecture);
  const selectedLecture = lectureData.find(lecture => lecture._id === lectureId);
  const [lectureTitle, setLectureTitle] = useState(selectedLecture.lectureTitle);
  const [videoUrl, setVideoUrl] = useState("");
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const dispatch = useDispatch();


  const handleEditLecture = async() => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("lectureTitle", lectureTitle);
      formData.append("videoUrl", videoUrl);
      formData.append("isPreviewFree", isPreviewFree);

      const result = await axios.post(serverUrl + `/api/course/editlecture/${lectureId}`, formData, { withCredentials: true })
      console.log(result.data);
      dispatch(setLectureData([...lectureData, result.data]));
      toast.success("Lecture Updated successfully");
      navigate("/courses");
      setLoading(false);
    } catch (error) {
      //console.log(error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  }

  const removeLecture = async () => {
    setLoading1(true);
    try {
      const result = await axios.delete(serverUrl + `/api/course/removelecture/${lectureId}`, { withCredentials: true });
      console.log(result.data);
      navigate(`/createlecture/${courseId}`);
      toast.success("lecture Deleted successfully");


    } catch (error) {
      console.log(error);
      setLoading1(false);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-600 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        {/* Header */}
        <div className=" flex items-center gap-4 mb-2">
          <FaArrowLeftLong className="text-gray-600 cursor-pointer mb-6"
            onClick={() => navigate(`/createlecture/${courseId}`)} />
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-gray-800">Update Your Lecture</span>
          </h2>
        </div>


        {/* Remove Lecture Button */}
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-red-700 transition-all"
          disabled={loading1}
          onClick={removeLecture}>
          {loading1 ? <ClipLoader size={30} color='white' /> : " Remove Lecture"}
        </button>

        {/* Title */}
        <label className="block font-medium mb-1 text-gray-700">LectureTitle</label>
        <input
          type="text"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        {/* Video */}
        <label className="block font-medium mb-1 text-gray-700">Video *</label>
        <div className="w-full border border-gray-300 rounded-lg p-3 flex items-center gap-3 mb-4 bg-gray-50" >
          <input
            type="file"

            className="w-full p-3 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm
            file:bg-gray-700 file:text-[white] hover:file:bg-gray-500"
            required
            accept='video/*'
            onChange={(e) => setVideoUrl(e.target.files[0])}
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            id='isPreviewFree'
            className="accent-[black] h-4  w-4 "
            onChange={() => setIsPreviewFree(prev => !prev)}
          />
          <label className="text-gray-700">Is this video FREE</label>
        </div>
        {loading ? <p className="mb-5">Uploading video... please wait...</p> : ""}

        {/* Update Button */}
        <button className="w-full bg-black text-white py-3 rounded-lg text-lg hover:bg-gray-900 transition-all"
          disabled={loading}
          onClick={handleEditLecture} >
          {loading ? <ClipLoader size={30} color='white' /> : "Update Lecture"}

        </button>
      </div>
    </div>
  );
}
export default EditLecture

