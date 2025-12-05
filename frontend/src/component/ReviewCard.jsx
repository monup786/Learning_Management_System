import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

function ReviewCard({ ratingText, rating, photoUrl, name, description, courseTitle }) {
    return (
        <div className="w-full md:w-[330px] bg-[#f8f6f6] shadow-md rounded-2xl p-5  hover:shadow-lg transition-all">

            {/* Rating */}
            <div className="flex items-center gap-3 mb-3 text-sm text-yellow-500">
                {
                     Array(5).fill(0).map((_, i) => (
                        <span key={i}>
                            {i < rating ? <FaStar /> : <FaRegStar />}
                        </span>
                    ))
                }
            </div>

            {/* Rating */}
            {/* <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                        key={i}
                        className={`${
                            i < review?.rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                    />
                ))}
            </div> */}
            <p className="text-gray-700 text-lg mb-2 ">
              <span className="font-bold"> Review for :</span>  <span className="text-blue-600">{courseTitle}</span>
            </p>
            <p className="text-gray-700 text-lg ">
              <span className="font-bold"> Review : </span> <span className="text-blue-600">{ratingText}</span>
            </p>

            <div className="flex items-center mt-4 gap-2">
                <img src={photoUrl}  className="w-10 h-10 rounded-full object-cover" />
                <div>
                       <h2 className="font-semibold text-gray-800 text-md">{name}</h2>
                 <p className="text-sm text-gray-900">{description}</p>
                </div>
               
            </div>
           
        </div>
    );
}

export default ReviewCard;

