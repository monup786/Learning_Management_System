import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { setUserData } from "../redux/userSlice";
function EditProfile() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const dispatch=useDispatch();
  const [name,setName]=useState(userData.name||"");
    const [description,setDescription]=useState(userData.description||"");
    const [photoUrl,setPhotoUrl]=useState(null);
    const [loading,setLoading]=useState(false);

    const handleEditProfile=async(e) => {
        setLoading(true);
        const formData=new FormData();
    formData.append("name",name);
      formData.append("description",description);
     formData.append("photoUrl",photoUrl);
        try {
            
            const result = await axios.post( serverUrl + "/api/user/profile",formData,{credentials:true});
            dispatch(setUserData(result.data.user));
            setLoading(false);
            navigate("/");
            toast.success("Profile Updated Successfully");
        } catch(error) {
            setLoading(false);
           // console.log(error);
            toast.error(error.response.data.message); 
        }
    }
  return (
    <div className="min-h-screen  bg-black flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">
        <FaArrowLeftLong
          className=" absolute top-[4%] left-[5%] w-[25px] h-[45px] cursor-pointer "
          onClick={() => navigate("/profile")}
        />

        <h2 className="text-2xl  font-bold text-blue-500 text-center mb-5">
          Edit Your Profile
        </h2>

        <form className="space-y-5 mt-5" onSubmit={(e)=>e.preventDefault()}>
          <div className="flex flex-col  items-center text-center">
            {userData?.photoUrl ? (
              <img
                src={userData?.photoUrl}
                className="w-24 h-24 rounded-full object-cover border-4 border-black"
              />
            ) : (
              <div className="w-24 h-24 rounded-full text-white flex items-center  justify-center text-[30px] border-2 bg-black border-white">
                {userData?.name?.slice(0, 1)?.toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="image"
              className="text-sm font-medium text-black text-[15px] "
            >
              Select Avatar
            </label>
            <input
              id="image"
              type="file"
              name="photoUrl"
              placeholder="photoUrl"
              accept="image/*"
              className=" w-full px-4 py-2 mt-4 border rounded-md text-sm"
              onChange={(e)=>setPhotoUrl(e.target.files[0])}
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className=" font-medium text-black text-[15px]"
            >
              UserName
            </label>
            <input
              id="name"
              type="text"
              placeholder={userData.name}
              className=" w-full px-4 py-2 mt-4 border rounded-md text-sm"
                onChange={(e)=>setName(e.target.value)} value={name}
            />
          </div>
          <div>
            <label
              className="text-sm font-medium text-black text-[15px]"
            >
              Email
            </label>
            <input
                readOnly type="text"
              placeholder={userData.email}
              className=" w-full px-4 py-2 mt-4 border rounded-md text-sm"
              
            />
          </div>
          <div>
            <label
              
              className=" font-medium text-black text-[15px]"
            >
              About
            </label>
            <textarea
              name="description"
              placeholder="Tell us about yourself"
              rows={3}
              className=" w-full px-4 py-2 mt-4 border border-gray-300 rounded-md resize-none text-sm focus:ring-2 "
              onChange={(e)=>setDescription(e.target.value)} value={description}
            />
          </div>
          <button  className=" w-full py-2 rounded-md font-medium bg-blue-500 text-white active:bg-[#4b4b4b] 
          cursor-pointer transition" disabled={loading} onClick={handleEditProfile}>{loading?<ClipLoader size={30} color="white" />:"Save"}</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
