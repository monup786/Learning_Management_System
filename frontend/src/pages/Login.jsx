import React, { useState } from "react";
import google from "../assets/googleImage.png";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { auth, provider } from "../../utils/firebase.js";
import { signInWithPopup } from "firebase/auth";
import { FaArrowLeftLong } from "react-icons/fa6";
function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (req, res) => {
    setLoading(true);
    try {
      const result = await axios.post(serverUrl + "/api/auth/login", { email, password }, { withCredentials: true })

      // localStorage.setItem("user", JSON.stringify(result.data.user));
      dispatch(setUserData(result.data.user));
      setLoading(false);
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      // console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  }
  const googleLogin = async (req, res) => {
    try {
      const response = await signInWithPopup(auth, provider);
      //console.log(response);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      let role = "";

      const result = await axios.post(
        serverUrl + "/api/auth/googleauth",
        { name, email, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data.user));
      navigate("/");
      toast.success("Google Login Successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    // <div className="bg-[#2e2c2c] w-[100vw] h-[100vh] flex items-center justify-center">
    //   <form className="w-[90%] md:w-140 h-170 bg-[white] shadow-xl relative rounded-2xl " onSubmit={(e) => e.preventDefault()}>
    //     <FaArrowLeftLong
    //       className=" absolute top-[4%] left-[5%] w-[25px] h-[45px] cursor-pointer "
    //       onClick={() => navigate("/")}
    //     />

    //     <div className="md:w-[100%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 ">
    //       <div className="ml-1">
    //         <h1 className="font-semibold text-[black] text-4xl ">LearnHub</h1>
    //         {/* <h2 className="text-[#999797] text-[18px]"> create your Account</h2> */}
    //       </div>

    //       <div className="flex flex-col gap-3 w-[90%] items-start justify-center px-3">
    //         <label htmlFor="email" className="font-semibold">
    //           Email
    //         </label>
    //         <input
    //           id="email"
    //           type="text"
    //           className="border-1 w-120 h-[35px] border-[#e7e6e6] text-15px px-[20px]"
    //           placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} value={email}
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
    //           placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} value={password}
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
         

    //       <button
    //         className="w-[85%] h-[40px] bg-[#0a47b8] text-white cursor-pointer flex items-center
    //       justify-center rounded-[7px]" disabled={loading} onClick={handleLogin}
    //       >
    //         {loading ? <ClipLoader size={30} color="white" /> : "Login"}
    //       </button>
    //       <span className="text-[15px] cursor-pointer text-[#585757]" onClick={() => navigate('/forget')}>Forget Your Password ?</span>
    //       <div className="w-[80%] flex items-center gap-2">
    //         <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
    //         <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
    //           Or Continue
    //         </div>
    //         <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
    //       </div>
    //       <div
    //         className="w-[80%] h-[40px] border-1 border-[black] cursor-pointer rounded-[5px] flex 
    //       items-center justify-center " onClick={googleLogin}
    //       >
    //         <img src={google} className="w-[25px] " />
    //         <span className="text-[18px]  text-gray-500">oogle</span>
    //       </div>
    //       <div className="text-[#6f6f6f] mt-5">
    //         Create New Account?{" "}
    //         <span
    //           className="text-[#0a47b8] font-bold cursor-pointer"
    //           onClick={() => navigate("/signup")}
    //         >
    //           SignUp
    //         </span>
    //       </div>
    //     </div>
    //   </form>
    // </div>

    <div className="bg-[#2e2c2c] w-[100vw] h-[100vh] flex items-center justify-center">

  <form 
    className="w-[90%] max-w-sm bg-[white] shadow-xl relative rounded-2xl p-6" 
    onSubmit={(e) => e.preventDefault()}
  >
    <FaArrowLeftLong
      
      className="absolute top-4 left-4 w-[25px] h-[25px] cursor-pointer text-black" 
      onClick={() => navigate("/")}
    />

    
    <div className="w-full flex flex-col items-center justify-center gap-3 mt-8 mb-4">
      <div>
        <h1 className="font-semibold text-[black] text-4xl ">LearnHub</h1>
        <h2 className="text-[#999797] text-[18px]"> Login to your Account</h2>
      </div>
    </div>

    
    <div className="flex flex-col gap-5 w-full items-center justify-center">

      {/* Email Input */}
      <div className="flex flex-col gap-2 w-full px-3">
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          id="email"
          type="text"
          className="border-1  w-full h-10 px-4 border-black rounded-lg text-base "
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
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
          
          className="border border-gray-300 w-full h-10 px-4 rounded-lg text-base "
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        {/* Eye Icon positioned relative to the input field, inside the password wrapper div */}
        {!show ? (
          <IoEyeOffSharp
            className="absolute w-5 h-5 cursor-pointer right-5 top-[40%] mt-3 text-gray-500"
            onClick={() => setShow((prev) => !prev)}
          />
        ) : (
          <IoEyeSharp
            className="absolute w-5 h-5 cursor-pointer right-5 top-[40%] mt-3 text-gray-500"
            onClick={() => setShow((prev) => !prev)}
          />
        )}
      </div>

      <button
        
        className="w-[90%] py-2 bg-[#0a47b8] text-white cursor-pointer flex items-center
        justify-center rounded-[7px] font-semibold"
        disabled={loading}
        onClick={handleLogin}
      >
        {loading ? <ClipLoader size={30} color="white" /> : "Login"}
      </button>

      <span className="text-sm cursor-pointer text-[#585757]" onClick={() => navigate('/forget')}>Forget Your Password?</span>

      {/* Or Continue Divider */}
      <div className="w-[90%] flex items-center gap-2">
        <div className="w-full h-[1px] bg-[#c4c4c4]"></div>
        <div className="text-sm text-[#6f6f6f] whitespace-nowrap">
          Or Continue
        </div>
        <div className="w-full h-[1px] bg-[#c4c4c4]"></div>
      </div>

      {/* Google Login Button */}
      <div
        // 👇 MODIFIED: w-[90%] with standard height and better focus
        className="w-[90%] h-10 border border-gray-300 cursor-pointer rounded-lg flex 
        items-center justify-center hover:bg-gray-50 transition-colors"
        onClick={googleLogin}
      >
        <img src={google} className="w-[25px]" alt="Google Logo" />
        <span className="text-base text-gray-500">oogle</span>
      </div>

      {/* Signup Link */}
      <div className="text-[#6f6f6f] mt-3 mb-6 text-sm">
        Create New Account?{" "}
        <span
          className="text-[#0a47b8] font-bold cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          SignUp
        </span>
      </div>
    </div>
  </form>
</div>
  );
}


export default Login