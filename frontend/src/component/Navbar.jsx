import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
function Navbar() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      console.log(result.data);
      toast.success("Logout Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] z-999 bg-[#4d5552] shadow-md p-4 flex justify-between items-center">
        <div className="lg:w-[20%] w-[40%] pl-[30px] ">
          <img
            src={logo}
            alt=""
            className="w-[60px] h-[55px] rounded-full border-2 border-black"
          />
        </div>

        <div className="w-[30%] lg:flex justify-center items-center gap-5 hidden">
          {userData ? (
            userData.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt="profile"
                className="w-[50px] h-[50px] cursor-pointer text-white rounded-full text-[20px]
              flex items-center justify-center bg-black border-2 border-white"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <div
                className="w-[50px] h-[50px] cursor-pointer text-white rounded-full text-[20px]
              flex items-center justify-center bg-black border-2 border-white"
                onClick={() => setShow((prev) => !prev)}
              >
                {userData.name?.slice(0, 1)?.toUpperCase() || ""}
              </div>
            )
          ) : (
            <IoPersonCircleSharp
              className="w-[60px] h-[70px] cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          )}


          {userData?.role === "educator" && (
            <div
              className="px-[20px] py-[10px]   text-[18px] bg-blue-500 text-white rounded-2xl
           font-light flex cursor-pointer gap-2" onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </div>
          )}
          {!userData ? (
            <span
              className="px-[20px] py-[10px]   text-[18px] bg-blue-500 text-white rounded-2xl
           font-light flex cursor-pointer gap-2"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="px-[20px] py-[10px]   text-[18px] bg-blue-500 text-white rounded-2xl
           font-light flex cursor-pointer gap-2"
              onClick={handleLogout}
            >
              Logout
            </span>
          )}
          {show && (
            <div
              className="absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 
          text-[16px] rounded-md bg-blue-500 px-[15px] py-[10px] border-2px border-black hover:border-white
          hover:text-cursor-pointer hover:bg-blue-500 hover:text-[white] shadow-lg"
            >
              <span
                className="bg-black text-white px-[30px] py-[10px] cursor-pointer rounded-2xl hover:bg-gray-600"
                onClick={() => navigate("/profile")}
              >
                My Profile
              </span>
              <span className="bg-black text-white px-[30px] py-[10px] rounded-2xl cursor-pointer hover:bg-gray-600"
                onClick={() => navigate("/mycourses")}>
                My Course
              </span>
            </div>
          )}
        </div>
        <RxHamburgerMenu
          className="w-[35px] h-[35px] lg:hidden text-black cursor-pointer"
          onClick={() => setShowHamburger((prev) => !prev)}
        />
        <div
          className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-gray-400 flex items-center justify-center 
        flex-col gap-5 z-10 lg:hidden ${showHamburger
              ? "translate-x-[0] transition duration-600"
              : "translate-x-[-100%] transition duration-600"
            }  
         `}
        >
          <RxCross1
            className="w-[35px] h-[35px] fill-white absolute top-5 right-[4%]"
            onClick={() => setShowHamburger((prev) => !prev)}
          />
          {/* {!userData && (
            <IoPersonCircleSharp className="w-[50px] h-[50px] cursor-pointer " />
          )}

          {userData?.photoUrl ? <img src={userData?.photoUrl}
            className="w-[50px] h-[50px] cursor-pointer text-white rounded-full text-[20px]
          flex items-center justify-center bg-black border-2 border-white "

          /> : (
            <div
              className="w-[50px] h-[50px] cursor-pointer text-white rounded-full text-[20px]
          flex items-center justify-center bg-black border-2 border-white"
            >
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )} */}



          {userData ? (
            userData.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt="profile"
                className="w-[50px] h-[50px] cursor-pointer text-white rounded-full text-[20px]
              flex items-center justify-center bg-black border-2 border-white"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <div
                className="w-[50px] h-[50px] cursor-pointer text-white rounded-full text-[20px]
              flex items-center justify-center bg-black border-2 border-white"
                onClick={() => setShow((prev) => !prev)}
              >
                {userData.name?.slice(0, 1)?.toUpperCase() || ""}
              </div>
            )
          ) : (
            <IoPersonCircleSharp
              className="w-[60px] h-[70px] cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          )}


          

          <div
            className="w-[200px] h-[65px] border-2  text-[18px] bg-black  text-white rounded-2xl
           font-light flex items-center justify-center cursor-pointer gap-2"
            onClick={() => navigate("/profile")}
          >
            My Profile
          </div>
          <div
            className="w-[200px] h-[65px] border-2  text-[18px] bg-black  text-white rounded-2xl
           font-light flex items-center justify-center cursor-pointer gap-2"  onClick={() => navigate("/mycourses")}
          >
            My Courses
          </div>
          {userData?.role === "educator" && (
            <div
              className="w-[200px] h-[65px] border-2  text-[18px] bg-black text-white rounded-2xl
           font-light flex items-center justify-center  cursor-pointer gap-2" onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </div>
          )}
          {!userData ? (
            <span
              className="w-[200px] h-[65px] border-2  text-[18px] bg-black  text-white rounded-2xl
           font-light flex items-center justify-center cursor-pointer gap-2"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="w-[200px] h-[65px] border-2  text-[18px] bg-black  text-white rounded-2xl
           font-light flex items-center justify-center cursor-pointer gap-2"
              onClick={handleLogout}
            >
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
