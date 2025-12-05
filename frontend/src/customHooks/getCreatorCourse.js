import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from "../App";
import { useDispatch, useSelector } from 'react-redux';
import {setCreatorCourseData} from '../redux/courseSlice'
const getCreatorCourse =()=> {
    const dispatch=useDispatch();
    const {userData}=useSelector(state=>state.user)
  return (
    useEffect(()=>{
     const creatorCourses=async()=>{
        try {
           const result= await axios.get(serverUrl +"/api/course/getcreatorcourse" , {withCredentials:true});
           console.log(result.data.courses);
           
           dispatch(setCreatorCourseData(result.data.courses));
        } catch (error) {
             console.log(error);
            //console.log( "failed to get all creator course ",error );
        }
     }
     creatorCourses();
    },[userData])
  )
}

export default getCreatorCourse;