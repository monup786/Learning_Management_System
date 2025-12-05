import express from "express";

import isAuth from "../middlewares/isAuth.js";

//import { getCurrentUser, updateProfile } from "../controllers/userController.js";
import upload from "../middlewares/multer.js";
import { createCourse, createLecture, deleteCourse, deleteLecture, editCourse,
 editLecture,
 getCourseById, getCourseLecture, getCreatorById, getCreatorCourse, getPublishedCourses } 
from "../controllers/courseController.js";
import { searchWithAi } from "../controllers/searchController.js";


const courseRouter=express.Router();

courseRouter.post("/create",isAuth,createCourse);
courseRouter.get("/getpublished",getPublishedCourses);
courseRouter.get("/getcreatorcourse",isAuth,getCreatorCourse);
courseRouter.post("/editcourse/:courseId",isAuth,upload.single("thumbnail"),editCourse);
courseRouter.get("/getcoursebyId/:courseId",isAuth,getCourseById);
courseRouter.delete("/delete/:courseId",isAuth,deleteCourse);


//for lectures

courseRouter.post("/createlecture/:courseId",isAuth,createLecture);
courseRouter.get("/courselecture/:courseId",isAuth,getCourseLecture);
courseRouter.post("/editlecture/:lectureId",isAuth,upload.single("videoUrl"),editLecture);
courseRouter.delete("/removelecture/:lectureId",isAuth,deleteLecture);
courseRouter.post("/creator",isAuth,getCreatorById);



//for search 

courseRouter.post("/search", searchWithAi);
export default courseRouter;