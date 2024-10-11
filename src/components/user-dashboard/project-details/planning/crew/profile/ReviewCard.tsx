import Image from "next/image";
import React from "react";
import StarRating from "./StarRating";

const ReviewCard = () => {
  return (
    <article className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md mt-4">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 mr-4 rounded-full overflow-hidden">
          <Image src="/profile.png" alt="Profile" width={50} height={50} />
        </div>
        <div className="font-medium dark:text-white">
          <p>
            Jese Leos
            <p className="block text-sm text-gray-500 dark:text-gray-400">China</p>
          </p>
        </div>
      </div>
      <hr />
      <StarRating rating={4} className=" my-3" />

      <p className="mb-2 text-gray-500 dark:text-gray-400">
        Good partner, know very well what we want. Glad to work with. fast delivery, good quality!
        Highly recommended.
      </p>
      <aside>
        <div className="flex items-center mt-3">
          <a
            href="#"
            className="px-2 py-1.5 text-xs font-medium bg-white border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
          >
            Helpful
          </a>
          <a
            href="#"
            className="ml-4 text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Report abuse
          </a>
        </div>
      </aside>
    </article>
  );
};

export default ReviewCard;
