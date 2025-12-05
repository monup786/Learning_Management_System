import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import searchAi from '../assets/searchAi.png';
import { FaMicrophone } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../App';
import audioSound from '../assets/audioSound.mp3';
function SearchAi() {
  const audio = new Audio(audioSound);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [listening, setListening] = useState(false);
  function playAudio(message) {
    let utterance = new SpeechSynthesisUtterance(message);

    window.speechSynthesis.speak(utterance);

  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  if (!recognition) {
    toast.error("Speech Recognition is not supported in this browser.");
  }

  const handleSearch = async () => {
    if (!recognition) return;
    setListening(true);
    recognition.start();
    audio.play();
    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript.trim();
      setInput(transcript);
      await handleRecommendation(transcript);
      //fetchRecommendations(transcript);
    }
  }
  const handleRecommendation = async (query) => {

    try {
      const result = await axios.post(serverUrl + "/api/course/search", { input: query }, { withCredentials: true })
      console.log(result.data);
      setRecommendations(result.data);
      setListening(false);

      if (result.data.length > 0) {
        playAudio("Here are some course recommendations based on your query.");
      }
      else {
        playAudio("Sorry, I couldn't find any courses matching your query.");
      }
    } catch (error) {
      console.log(error);
      setListening(false);
      //toast.error("Failed to fetch recommendations. Please try again.");
    }
  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-500 to-gray-600 text-white flex flex-col items-center
    px-4 py-16'>
      {/* search container */}
      <div className='bg-white shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-center relative '>
        <FaArrowLeftLong className='text-[black] w-[22px] h-[22px] cursor-pointer absolute' onClick={()=>navigate('/')}/>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-600 mb-6 flex items-center justify-center gap-2'>
          <img src={searchAi} className='w-8 h-8 sm:w-[30px] sm:h-[30px]' />
          Search with <span className='text-green-600'> AI</span>
        </h1>
        <div className='flex items-center bg-gray-700 rounded-full overflow-hidden shadow-lg relative w-full'>
          <input type="text" className="flex-grow bg-gray-700 placeholder-gray-400 text-white rounded-l-full px-4 py-4 
            focus:outline-none text-sm sm:text-base" placeholder='Write your Query Here....'
            onChange={(e) => setInput(e.target.value)} value={input} />

          {input && <button onClick={() => handleRecommendation(input)} className=" absolute right-14 sm:right-16 bg-white rounded-full">
            <img src={searchAi} className='w-10 h-10 p-2 rounded-full' />
          </button>}
          <button className=' absolute right-2 bg-white rounded-full w-10 h-10 flex items-center justify-center'
            onClick={handleSearch}>
            <FaMicrophone className='text-gray-700 w-6 h-6' />

          </button>
        </div>
      </div>
      {
        recommendations.length > 0 ? (
          <div className='mt-12 px-2 sm:px-4 w-full max-w-6xl'>
            <h2 className='text-xl sm:text-2xl font-semibold mb-6 text-center text-gray-200'>Course Recommendations Results:</h2>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8'>
              {recommendations?.map((course,index) => (
                 <div key={index} className='bg-[#dab7b7] text-black p-5 rounded-2xl shadow-md hover:shadow-indigo-500/30
                 transition-all duration-200 border border-gray-200 cursor-pointer hover:bg-gray-200'
                 onClick={()=>navigate(`/viewcourse/${course._id}`)}>
                  <h2 className='text-[20px]  sm:text-xl'><span className='font-bold'>Course Name : </span>{course.title}</h2>
                  <p className='text-[15px]  sm:text-xl'> <span className='font-bold'>Category : </span>{course.category}</p>
                 </div>
              ))
               }
            </div>
          </div>
        ) : (listening ? <h1 className='text-center text-xl sm:text-2xl mt-10 text-gray-400'>Listening....</h1> :
          <h1 className='text-center text-xl sm:text-2xl mt-10 text-gray-400'>No Courses found Yet</h1>
        )}
    </div>
  )
}

export default SearchAi
