import { cn } from "@/lib/utils";
import React from "react";

type StarRatingProps = {
  rating: number;
  className?: string;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, className }) => {
  const totalStars = 5;

  return (
    <div className={cn(`flex items-center`, className && className)}>
      <section className="flex items-center space-x-1">
        {[...Array(totalStars)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${index < rating ? "text-gray-800" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
      </section>
      <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        {rating} out of 5
      </span>
    </div>
  );
};

export default StarRating;
