import React from "react";
import StarRating from "./StarRating";

const RatingSection = () => {
  const ratings = [
    { star: 5, percent: 70 },
    { star: 4, percent: 17 },
    { star: 3, percent: 8 },
    { star: 2, percent: 4 },
    { star: 1, percent: 1 },
  ];

  return (
    <div className="mb-4">
      <StarRating rating={4.7} className=" my-4" />
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
      {ratings.map((rating) => (
        <div key={rating.star} className="flex items-center mt-4">
          <a
            href="#"
            className="text-sm font-medium text-gray-600 dark:text-blue-500 hover:underline"
          >
            {rating.star} star
          </a>
          <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700 overflow-hidden">
            <div className="h-5 bg-gray-900" style={{ width: `${rating.percent}%` }}></div>
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {rating.percent}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default RatingSection;
