import React, { useState } from "react";
import google from "../assets/googleImage.png";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl } from "../App.jsx";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase.js";
function SignUp() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("learner");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        { name, email, password, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data.user));
      console.log(result.data);
      setLoading(false);
      navigate("/");
      toast.success("SignUp Successful");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  // code for google authentication
  const googleSignUp = async (req, res) => {
    try {
      const response = await signInWithPopup(auth, provider);
      //console.log(response);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googleauth",
        { name, email, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data.user));
      navigate("/");
      toast.success("Google SignUp Successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    // <div className="bg-[#2e2c2c]  w-[100vw] h-[100vh] flex items-center justify-center">
    //   <form
    //     className="w-[90%] md:w-140 h-170 bg-[white] shadow-xl rounded-2xl "
    //     onSubmit={(e) => e.preventDefault()}
    //   >
    //     <div className="md:w-[100%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 ">
    //       <div className="ml-1">
    //         <h1 className="font-semibold text-[black] text-4xl ">LearnHub</h1>
    //         <h2 className="text-[#999797] text-[18px]"> create your Account</h2>
    //       </div>
    //       <div className="flex flex-col gap-3 w-[90%] items-start justify-center px-3">
    //         <label htmlFor="name" className="font-semibold">
    //           Name
    //         </label>
    //         <input
    //           id="name"
    //           type="text"
    //           className="border-1 w-120  h-[35px] border-[#e7e6e6] text-15px px-[20px]"
    //           placeholder="Enter your Name"
    //           onChange={(e) => setName(e.target.value)}
    //           value={name}
    //         />
    //       </div>
    //       <div className="flex flex-col gap-3 w-[90%] items-start justify-center px-3">
    //         <label htmlFor="email" className="font-semibold">
    //           Email
    //         </label>
    //         <input
    //           id="email"
    //           type="text"
    //           className="border-1 w-120 h-[35px] border-[#e7e6e6] text-15px px-[20px]"
    //           placeholder="Enter your Email"
    //           onChange={(e) => setEmail(e.target.value)}
    //           value={email}
    //         />
    //       </div>
    //       <div className="flex flex-col gap-3 w-[90%] items-start justify-center px-3 relative">
    //         <label htmlFor="password" className="font-semibold">
    //           Password
    //         </label>
    //         <input
    //           id="password"
    //           type={show ? "text" : "password"}
    //           className="border-1 w-120  h-[35px] border-[#e7e6e6] text-20px px-[20px]"
    //           placeholder="Enter your Password"
    //           onChange={(e) => setPassword(e.target.value)}
    //           value={password}
    //         />
    //         {!show ? (
    //           <IoEyeOffSharp
    //             className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
    //             onClick={() => setShow((prev) => !prev)}
    //           />
    //         ) : (
    //           <IoEyeSharp
    //             className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
    //             onClick={() => setShow((prev) => !prev)}
    //           />
    //         )}
    //       </div>
    //       <div className="flex md:w-[50%] w-[70%] items-center justify-between">
    //         <span
    //           className={`px-[10px] py-[5px] border-[3px] border-[#dfc7c7] rounded-xl  
    //         cursor-pointer hover:border-[red] font-semibold ${
    //           role === "learner" ? "border-black" : "border-[#646464]"
    //         }`}
    //           onClick={() => setRole("learner")}
    //         >
    //           Learner
    //         </span>
    //         <span
    //           className={`px-[10px] py-[5px] border-[3px] border-[#dfc7c7] rounded-xl  
    //         cursor-pointer hover:border-[red] font-semibold ${
    //           role === "educator" ? "border-black" : "border-[#646464]"
    //         } `}
    //           onClick={() => setRole("educator")}
    //         >
    //           Educator
    //         </span>
    //       </div>
    //       <button
    //         className="w-[85%] h-[40px] bg-[#0a47b8] text-white cursor-pointer flex items-center
    //       justify-center rounded-[7px]"
    //         onClick={handleSignup}
    //         disabled={loading}
    //       >
    //         {loading ? <ClipLoader size={30} color="white" /> : "SignUp"}
    //       </button>
    //       <div className="w-[80%] flex items-center gap-2">
    //         <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
    //         <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
    //           Or SignUp with
    //         </div>
    //         <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
    //       </div>
    //       <div
    //         className="w-[80%] h-[40px] border-1 border-[black] cursor-pointer rounded-[5px] flex 
    //       items-center justify-center "
    //         onClick={googleSignUp}
    //       >
    //         <img src={google} className="w-[25px]" />
    //         <span className="text-[18px] text-gray-500">oogle</span>
    //       </div>
    //       <div className="text-[#6f6f6f]">
    //         Already have an account?{" "}
    //         <span
    //           className="text-[#0a47b8] font-bold  cursor-pointer"
    //           onClick={() => navigate("/login")}
    //         >
    //           Login
    //         </span>
    //       </div>
    //     </div>
    //   </form>
    // </div>
    <div className="bg-[#2e2c2c] w-[100vw] h-[100vh] flex items-center justify-center">
  <form
    // 👇 MODIFIED: Using max-w-sm for max width on large screens, w-[90%] for mobile, and removed fixed height/non-Tailwind classes. Added p-6 for inner padding.
    className="w-[90%] max-w-sm bg-[white] shadow-xl rounded-2xl p-6"
    onSubmit={(e) => e.preventDefault()}
  >
    <div className="w-full flex flex-col items-center justify-center gap-5">
      {/* Title Section */}
      <div className="mt-4 mb-2 flex flex-col items-center">
        <h1 className="font-semibold text-[black] text-4xl ">LearnHub</h1>
        <h2 className="text-[#999797] text-[18px]"> create your Account</h2>
      </div>

      {/* Name Input */}
      <div className="flex flex-col gap-2 w-full px-3">
        <label htmlFor="name" className="font-semibold">
          Name
        </label>
        <input
          id="name"
          type="text"
          // 👇 MODIFIED: w-full and standard h-10, border, and focus classes
          className="border border-gray-300 w-full h-10 px-4 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      {/* Email Input */}
      <div className="flex flex-col gap-2 w-full px-3">
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          id="email"
          type="text"
          // 👇 MODIFIED: w-full and standard h-10
          className="border border-gray-300 w-full h-10 px-4 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      {/* Password Input */}
      <div className="flex flex-col gap-2 w-full px-3 relative">
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <input
          id="password"
          type={show ? "text" : "password"}
          // 👇 MODIFIED: w-full and standard h-10
          className="border border-gray-300 w-full h-10 px-4 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {!show ? (
          <IoEyeOffSharp
            // 👇 MODIFIED: Reliable positioning relative to the input field
            className="absolute w-5 h-5 cursor-pointer right-5 top-[43%] mt-3 text-gray-500"
            onClick={() => setShow((prev) => !prev)}
          />
        ) : (
          <IoEyeSharp
            // 👇 MODIFIED: Reliable positioning relative to the input field
            className="absolute w-5 h-5 cursor-pointer right-5 top-[43%] mt-3 text-gray-500"
            onClick={() => setShow((prev) => !prev)}
          />
        )}
      </div>

      {/* Role Selection */}
      <div className="flex w-[90%] items-center justify-center gap-4">
        <span
          // 👇 MODIFIED: Used standard border and padding classes, w-full ensures they share the space
          className={`w-full text-center px-4 py-2 border-2 rounded-xl cursor-pointer hover:border-blue-500 font-semibold transition ${
            role === "learner" ? "border-black  bg-gray-100" : "border-gray-300"
          }`}
          onClick={() => setRole("learner")}
        >
          Learner
        </span>
        <span
          // 👇 MODIFIED: Used standard border and padding classes, w-full ensures they share the space
          className={`w-full text-center px-4 py-2 border-2 rounded-xl cursor-pointer hover:border-blue-500 font-semibold transition ${
            role === "educator" ? "border-black bg-gray-100" : "border-gray-300"
          }`}
          onClick={() => setRole("educator")}
        >
          Educator
        </span>
      </div>

      <button
        // 👇 MODIFIED: w-[90%] and standard py-2 for height
        className="w-[90%] py-2 bg-[#0a47b8] text-white cursor-pointer flex items-center
        justify-center rounded-[7px] font-semibold transition"
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? <ClipLoader size={30} color="white" /> : "SignUp"}
      </button>

      {/* Or SignUp with Divider */}
      <div className="w-[90%] flex items-center gap-2">
        <div className="w-full h-[1px] bg-[#c4c4c4]"></div>
        <div className="text-[15px] text-[#6f6f6f] whitespace-nowrap">
          Or SignUp with
        </div>
        <div className="w-full h-[1px] bg-[#c4c4c4]"></div>
      </div>

      {/* Google Login Button */}
      <div
        // 👇 MODIFIED: w-[90%] and standard py-2 for height
        className="w-[90%] py-2 border border-gray-300 cursor-pointer rounded-lg flex 
        items-center justify-center gap-2 hover:bg-gray-50 transition-colors mb-4"
        onClick={googleSignUp}
      >
        {/* Added alt tag for image */}
        <img src={google} className="w-[25px]" alt="Google Logo" />
        <span className="text-[18px] text-gray-500">oogle</span>
      </div>

      {/* Login Link */}
      <div className="text-[#6f6f6f] text-sm mb-4">
        Already have an account?{" "}
        <span
          className="text-[#0a47b8] font-bold cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </div>
    </div>
  </form>
</div>
  );
}

export default SignUp;
