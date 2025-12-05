import React from "react";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function Card({ thumbnail, title, category, price, id ,reviews

}) {
  const navigate=useNavigate();
  const calAvgReview=(reviews)=>{
 if(!reviews || reviews.length===0) return 0;
 const total=reviews.reduce((acc,review)=>acc + review.rating,0);
 return (total/reviews.length).toFixed(1);
}
const avgRating=calAvgReview(reviews);
  return (
    <div
      className="max-w-sm w-full bg-gray-300 rounded-2xl overflow-hidden shadow-2xl
    hover:shadow-lg transition-all duration-200  cursor-pointer" 
    onClick={()=>navigate(`/viewcourse/${id}`)}
    >
      <img src={thumbnail} className="w-full h-50 object-cover" />
      <div className="p-5 space-y-2">
        <h2 className="text-lg  text-gray-900"> {title} </h2>
        <span className="px-2 py-0.5 text-blue-500 font-bold rounded-full   capitalize">
          {category}
        </span>
        <div className="flex justify-between text-sm mt-3 px-[10px]">
          <span className="font-semibold text-gray-800">₹ {price}</span>

          <span className="flex items-center gap-1">
            {" "}
            <FaStar className="text-orange-500 " />{avgRating}{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
