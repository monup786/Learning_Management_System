import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../App";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../redux/lectureSlice";
import { toast } from "react-toastify";

const CreateLecture = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { lectureData } = useSelector(state => state.lecture);
  const [lectureTitle, setLectureTitle] = useState("");
  // const [lectures, setLectures] = useState([
  //   { id: 1, title: "Introduction to Backend" },
  //   { id: 2, title: "How to Setup NodeJS" },
  // ]);

  const handleCreateLecture = async () => {
    setLoading(true);
    try {
      const result = await axios.post(serverUrl + `/api/course/createlecture/${courseId}`, { lectureTitle }
        , { withCredentials: true }
      )
      console.log(result.data);
      dispatch(setLectureData([...lectureData, result.data.lecture]));
      setLoading(false);
      toast.success("Lecture Added successfully");
      setLectureTitle("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const getCourseLecture = async () => {
      try {
        const result = await axios.get(serverUrl + `/api/course/courselecture/${courseId}`, { withCredentials: true })
        console.log(result.data);
        dispatch(setLectureData(result.data.lectures));
      } catch (error) {
        console.log(error);
      }
    }
    getCourseLecture();
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-600 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">
          Add a New Lecture
        </h1>
        <p className="text-orange-500 mb-6">
          Provide a lecture title and include related videos to enrich your course.
        </p>

        {/* Input */}
        <input
          type="text"
          placeholder="e.g. Introduction to React Development"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none mb-5"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8">
          <button
            onClick={() => navigate(`/editcourse/${courseId}`)}
            className="flex items-center justify-center px-4 py-2 border bg-orange-500 border-gray-400 rounded-xl text-black hover:bg-orange-400 transition"
          >
            Back to Course
          </button>
          <button
            onClick={handleCreateLecture}
            className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color='white' /> : "Create Lecture"}

          </button>
        </div>

        {/* Lecture List */}
        <div className="space-y-3">
          {lectureData?.map((lecture, index) => (
            <div
              key={index}
              className="flex justify-between items-center border border-gray-400 rounded-xl px-4 py-3 bg-gray-50 hover:bg-gray-300 transition"
            >
              <span className="text-gray-700 font-medium">
                Lecture - {index + 1}  :  {lecture.lectureTitle}
              </span>
              <FiEdit2 className="text-gray-500 cursor-pointer hover:text-gray-700" onClick={()=>
                navigate(`/editlecture/${courseId}/${lecture._id}`)}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
