import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { serverUrl } from '../App';
import { setReviewData } from '../redux/reviewSlice';

const getAllReview = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const result = await axios.get(serverUrl + "/api/review/getreview", { withCredentials: true });
                dispatch(setReviewData(result.data));
                console.log(result.data);

            } catch (error) {
                console.log("Error while fetching reviews", error);
            }

        }
        fetchReviews();
    }, [])
}

export default getAllReview
