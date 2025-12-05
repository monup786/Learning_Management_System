import User  from '../models/userModel.js';
import Course from '../models/courseModel.js';
import uploadOnCloudinary from '../config/cloudinary.js';
import Lecture from '../models/lectureModel.js';

// course controller
export const createCourse = async (req, res) => {
    try {
        const {title,category}= req.body;
        if(!title || !category){
            return res.status(400).json({ message:"Title and Category are required" });
        }
        const course= await Course.create({
            title,
            category,
            creator:req.userId
        });
        return res.status(201).json({ course });
        } catch (error) {
        return res.status(500).json({ message: `Create Course Error${error}` });
    }
}

export const getPublishedCourses=async(req,res)=>{
    try {
        const  course=await Course.find({isPublished:true}).populate("lectures reviews");
        if(!course){
            return res.status(404).json({message:" course is not published yet"});
        }
        return res.status(200).json({course});

    } catch (error) {
        return res.status(500).json({message:`Failed to find isPublished Courses ${error}`});
    }
}
export const getCreatorCourse=async(req,res)=>{
    try {
        const userId=req.userId;
        const courses=await Course.find({creator:userId});
        if(!courses){
            return res.status(404).json({message:"No courses found for this creator"});
        }
        return res.status(200).json({courses});
    } catch (error) {
        return res.status(500).json({message:`Failed to get Creator
            
            Courses ${error}`});
    }
}
export const editCourse=async(req,res)=>{
    try {
        const {courseId}=req.params;
        const{title,subTitle,description,category,level,isPublished,price}=req.body;
        let thumbnail;
        if(req.file){
            thumbnail=await uploadOnCloudinary(req.file.path);
        }
        let course=await Course.findById(courseId);
        if(!course){
            return res.status(404).json({message:"Course is not found"});
        }
        const updateData={title,subTitle,description,category,level,isPublished,price,thumbnail};
        course=await Course.findByIdAndUpdate(courseId,updateData,{new:true});
        return res.status(200).json({course});
    } catch (error) {
        return res.status(500).json({message:`Failed to edit Course ${error}`});
    }
}

export const getCourseById=async(req,res)=>{
    try {
        const {courseId}=req.params;
        let course=await Course.findById(courseId)
         if(!course){
            return res.status(404).json({message:"Course is not found"});
         }
         return res.status(200).json({course});
    } catch (error) {
        return res.status(500).json({message:`Failed to edit Course By Id ${error}`});
    }
}

export const deleteCourse=async(req,res)=>{
    try {
        const {courseId}=req.params;
        let course=await Course.findById(courseId);
        if(!course){
            return res.status(404).json({message:"Course is not found"});
        }
        await Course.findByIdAndDelete(courseId,{new:true});
        return res.status(200).json({message:"Course deleted successfully"});
    } catch (error) {
        return res.status(500).json({message:`Failed to delete Course by Id ${error}`});
    }
}


//lecture controller

export const createLecture=async(req,res)=>{

    try {
      const  {lectureTitle} = req.body;
      const {courseId}=req.params;
      if(!lectureTitle || !courseId){
        return res.status(400).json({message:"LectureTitle is required"});
      }
   const lecture = await Lecture.create({lectureTitle});
   const course= await Course.findById(courseId);
    if(course){
        course.lectures.push(lecture._id);
    }
    // here using this line we can access the lectures through this course because we have populated it
    //means all lectures details we can check from course
    await course.populate("lectures");
    await course.save();
    return res.status(201).json({lecture,course});

    } catch (error) {
         return res.status(500).json({message:`Failed to create the lecture ${error}`});
    }
}

// controller for get course lecture

export const getCourseLecture = async(req,res)=>{
    try {
        const {courseId}=req.params;
        const course = await Course.findById(courseId);
        if(!course){
           return res.status(404).json({message:"Course is not found"});
        }
        await course.populate("lectures");
        await course.save();
        return res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({message:`failed to getcourselecture ${error}`});
    }
}




export const editLecture=async(req,res)=>{
    try {
        const {lectureId}=req.params;
        const {isPreviewFree,lectureTitle}=req.body;
        const lecture=await Lecture.findById(lectureId);
        if(!lecture){
            return res.status(404).json({message:"Lecture is not Found"});
        }
        let videoUrl
        if(req.file){
            videoUrl= await uploadOnCloudinary(req.file.path);
            lecture.videoUrl=videoUrl;

        }
        if(lectureTitle){
            lecture.lectureTitle=lectureTitle;
        }
        lecture.isPreviewFree= isPreviewFree;
        await lecture.save();
        return res.status(200).json(lecture);
    } catch (error) {
        return res.status(500).json({message:`failed to editLecture ${error}`});
    }
}





export const deleteLecture=async(req,res)=>{
    try {
        const {lectureId}=req.params;
        const lecture=await Lecture.findByIdAndDelete(lectureId);
        if(!lecture){
            return res.status(404).json({message:"Lecture is not found"});
        }
        await Course.updateOne(
            {lectures:lectureId},
            {$pull:{lectures:lectureId}}
        )
        return res.status(200).json({message:"Lecture Deleted Successfully "})
    } catch (error) {
        console.log(error);
    }
}

// we have to get creator all courses on my view courses page

export const getCreatorById=async(req,res)=>{
    try {
        const {userId}=req.body
        const user=await User.findById(userId).select("-password");
        if(!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json( user );
    } catch (error) {
        return res.status(500).json({message:`failed to get creator ${error}`});
    }
}
