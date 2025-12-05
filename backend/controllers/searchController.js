import Course from "../models/courseModel.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
export const searchWithAi= async(req,res)=>{
    try {
        const {input} = req.body;
        if(!input) return res.status(400).json({message: "Search Query is required"});

        const ai = new GoogleGenAI({
            apikey: process.env.GEMINI_API_KEY,
        });
     const prompt=`You are an intelligent assistant for an LMS platform.A user will type any query related to courses or about what that
     they want to learn. your task is to understand the user query and return one **most relevant keyword** from the 
     following list of course categories and levels : 
     - App Development
     - Web Development
     - Data Science
     - Data Analytics
     - AI Tools
     - Ethical Hacking  
     - UI/UX Design
     - AI/ML
     - Others
     - Beginner
     - Intermediate
     - Advanced
     
     Only return one keyword from the above list that best matches the user query.Donot explain anything.No extra text.
     Query: ${input}
     `
        const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
   const keyword=response.text
        const courses=await Course.find({
            isPublished: true,

             $or : [
                {title : { $regex: input, $options : 'i' }},
                {description : { $regex: input, $options : 'i' }},
                {subTitle : { $regex: input, $options : 'i' }},
                {category : { $regex: input, $options : 'i' }},
                {level : { $regex: input, $options : 'i' }}
             ]
        });
        if(courses.length >0){
           return  res.status(200).json(courses);
        }
        else{
              const courses=await Course.find({
            isPublished: true,

             $or : [
                {title : { $regex: keyword, $options : 'i' }},
                {description : { $regex: keyword, $options : 'i' }},
                {subTitle : { $regex: keyword, $options : 'i' }},
                {category : { $regex: keyword, $options : 'i' }},
                {level : { $regex: keyword, $options : 'i' }}
             ]
        });
          return  res.status(200).json(courses);
        }


      
    } catch (error) {
        res.status(500).json({ message: "failed to search Query", error });
    }
}