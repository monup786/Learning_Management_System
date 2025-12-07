import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
function ForgetPassword() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // for step 1
  const sendOtp = async () => {
    //api call
    setLoading(true);
    try {
      const result = await axios.post(
         `${serverUrl}/api/auth/sendotp`,
        { email },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      setStep(2);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  // for step 2
  const verifyOtp = async () => {
    // api call
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verifyotp`,
        { email,otp },
        { withCredentials: true }
      );
      console.log(result.data);  
      setLoading(false);
      setStep(3);
      toast.success(result.data.message);
    } catch (error) {
       
      //console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }
  //for step 3
  const resetPassword=async()=>{
    setLoading(true);

    try {
       if( newPassword!==confirmpassword){
          setLoading(false);
       return toast.error("Password and Confirm Password do not match");
        

       }
      const result=await axios.post(`${serverUrl}/api/auth/resetpassword`,
      {email,password:newPassword},
      {withCredentials:true});
      console.log(result.data);
      setLoading(false);
      navigate("/login");
      toast.success(result.data.message);
     
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen flex items-center shadow-2xl justify-center bg-gray-100 px-4">
      {/* step 1 */}
      {step === 1 && (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
            Forget Your Password
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-[16px] font-semibold mb-5 text-gray-700"
              >
                Enter Your Email address
              </label>
              <input
                id="email"
                type="text"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 mb-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
              disabled={loading}
              onClick={sendOtp}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
            </button>
          </form>
          <div
            className="text-sm text-center mt-4 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            {" "}
            Back to login
          </div>
        </div>
      )}
      {/* step 2 */}
      {step == 2 && (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
            Enter OTP
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm text-[16px] font-semibold mb-5 text-gray-700"
              >
                Please enter 4-digit code sent to your email
              </label>
              <input
                id="otp"
                type="text"
                placeholder=" * * * * "
                required
                className="w-full px-4 py-2 border border-gray-300 mb-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
             disabled={loading}  onClick={verifyOtp}
            >
             {loading? <ClipLoader size={30} color='white'/>:" Verify OTP"}
            </button>
          </form>
          <div
            className="text-sm text-center mt-4"
            onClick={() => navigate("/login")}
          >
            {" "}
            Back to login
          </div>
        </div>
      )}

      {/* step 3 */}
      {step == 3 && (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
            Reset Your Password
          </h2>
          <p className="text-sm text-black text-[16px] text-center mb-6">
            Enter new Password to regain access to your Account
          </p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-[16px] font-semibold mb-5 text-gray-700"
              >
                New Password
              </label>
              <input
                id="password"
                type="text"
                placeholder=" ************ "
                required
                className="w-full px-4 py-2 border border-gray-300 mb-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>
            <div>
              <label
                htmlFor="confirmpassword"
                className="block text-sm text-[16px] font-semibold mb-5 text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmpassword"
                type="text"
                placeholder=" ************ "
                required
                className="w-full px-4 py-2 border border-gray-300 mb-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmpassword}
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white mb-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
             disabled={loading} onClick={resetPassword}
            >
              {loading ?<ClipLoader size={30} color='white'/>:"Reset Password"}
            </button>
          </form>
          <div
            className="text-sm text-center cursor-pointer mt-4"
            onClick={() => navigate("/login")}
          >
            {" "}
            Back to login
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgetPassword;
