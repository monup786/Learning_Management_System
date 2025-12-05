import React from "react";
import Navbar from "../component/Navbar.jsx";
import image2 from "../assets/image2.jpg";
import image1 from "../assets/image1.jpg";
import home from "../assets/home.jpg";
import { FaSearch } from "react-icons/fa";
import { SiViaplay } from "react-icons/si";
import { MdSearch } from "react-icons/md";
import Logo from "../component/Logo.jsx";
import ExploreCourses from "../component/ExploreCourses.jsx";
import CardPage from "../component/CardPage.jsx";
import { useNavigate } from "react-router-dom";
import About from "../component/About.jsx";
import Footer from "../component/Footer.jsx";
import ReviewPage from "../component/ReviewPage.jsx";

function Home() {
  const navigate=useNavigate();
  return (
    <div className="w-[100%] overflow-hidden">
      <div className="w-[100%] lg:h-[140vh] h-[70vh] relative">
        <Navbar />
        <img
          src={home}
          className="object-cover md:object-fill w-[100%]  lg:h-[100%] h-[50vh]"
        />
        <span
          className="lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] 
      w-[100%] flex items-center justify-center text-black font-bold text-[20px]"
        >
          Your Journey to Excellence Starts Here{" "}
        </span>
        <span
          className="lg:text-[50px] mt-3 text-[20px] md:text-[40px] absolute lg:top-[18%] top-[20%] 
      w-[100%] flex items-center justify-center text-black font-bold "
        >
          Secure Your Future with Us
        </span>
        <div className="absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-3 flex-wrap">
          <button
            className="px-[20px] py-[10px] bg-[#17a1e6] mt-3  lg:text-black text-black
          rounded-[10px] text-[18px] font-semibold flex gap-3 cursor-pointer"
          onClick={()=>navigate('/allcourses')}
          >
            View All courses{" "}
            <SiViaplay
              className="w-[30px]
              h-[30px] lg:fill-black fill-black"   
            />
          </button>
          <button
            className="px-[40px] py-[10px] mt-3  bg-orange-500  lg:text-black text-black
          rounded-[10px] text-[18px] font-semibold flex gap-2 cursor-pointer" 
          onClick={()=>navigate('/search')}
          >
            Ask with AI
            <FaSearch className="w-[30px] h-[30px] hidden lg:block" />{" "}
            <MdSearch className="lg:hidden w-[30px] h-[30px]" />{" "}
          </button>
        </div>
      </div>
      <div className="flex mt-10 px-3 text-[20px] text-center justify-center font-bold"> --- LearnHub is Online Learning Platform where You can Explore a comprehensive and
         ever-growing library of expertly structured courses designed
         to meet the demands of today's rapidly evolving technological landscape, offering learners at every 
         level—whether beginners stepping into a new domain or professionals aiming to deepen their expertise—an 
         immersive blend of practical, hands-on training, guided mentorship, industry-relevant projects, and flexible
          learning pathways that empower you to master
         job-ready skills, stay ahead in your career, and confidently navigate the world of modern digital
          innovation.---</div>
      <Logo />
      <ExploreCourses/>
      <CardPage/>
      <About/>
      <ReviewPage/>
      <Footer/>
    </div>
  );
}

export default Home;
