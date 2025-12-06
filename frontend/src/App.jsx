import React from "react";
import Home from "./pages/Home.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
export const serverUrl = "https://learning-management-system-puvm.onrender.com";
import { ToastContainer } from "react-toastify";
import getCurrentUser from "./customHooks/getCurrentUser.js";
import EditProfile from "./pages/EditProfile.jsx";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import axios from "axios";
import Dashboard from "./pages/Educator/Dashboard.jsx";
import CoursesPage from "./pages/Educator/CoursesPage.jsx";
import CreateCourses from "./pages/Educator/CreateCourses.jsx";
import getCreatorCourse from "./customHooks/getCreatorCourse.js";
import EditCourses from "./pages/Educator/EditCourses.jsx";
import getPublishedCourse from "./customHooks/getPublishedCourse.js";
import AllCourses from "./pages/AllCourses.jsx";
import CreateLecture from "./pages/Educator/CreateLecture.jsx";
import EditLecture from "./pages/Educator/EditLecture.jsx";
import ViewCourse from "./pages/ViewCourse.jsx";
import ScrollToTop from "./component/ScrollToTop.jsx";
import ViewLectures from "./pages/ViewLectures.jsx";
import MyEnrolledCourses from "./pages/MyEnrolledCourses.jsx";
import getAllReview from "./customHooks/getAllReview.js";
import SearchAi from "./pages/SearchAi.jsx";
axios.defaults.withCredentials = true;
function App() {
  // Call the custom hook to get current user data all the time at home page
  getCurrentUser();
  getCreatorCourse();
  getPublishedCourse();
  getAllReview();
  const { userData } = useSelector((state) => state.user);
  return (
    <>
      <ToastContainer />
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to={"/signup"} />}
        />
        {/* <Route
          path="/forget"
          element={userData ? <ForgetPassword /> : <Navigate to={"/signup"} />}
        /> */}

        <Route
          path="/forget"
          element={<ForgetPassword />}
        />
        <Route
          path="/editprofile"
          element={userData ? <EditProfile /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/dashboard"
          element={
            userData?.role === "educator" ? (
              <Dashboard />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/courses"
          element={
            userData?.role === "educator" ? (
              <CoursesPage />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/createcourse"
          element={
            userData?.role === "educator" ? (
              <CreateCourses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/editcourse/:courseId"
          element={
            userData?.role === "educator" ? (
              <EditCourses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/allcourses"
          element={
            userData? (
              <AllCourses/>
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
         <Route
          path="/createlecture/:courseId"
          element={
            userData?.role === "educator" ? (
              <CreateLecture/>
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
         <Route
          path="/editlecture/:courseId/:lectureId"
          element={
            userData?.role === "educator" ? (
              <EditLecture/>
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/viewcourse/:courseId"
          element={
            userData? (
              <ViewCourse/>
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
         <Route
          path="/viewlecture/:courseId"
          element={
            userData ? (
              <ViewLectures/>
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
         <Route
          path="/mycourses"
          element={
            userData ? (
              <MyEnrolledCourses/>
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
           <Route
          path="/search"
          element={
            userData ? (
              <SearchAi/>
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
      </Routes>
      
   </>
  );
}

export default App;
