import React from "react";
import { Skeleton } from "../ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <>
      <Skeleton className="mt-6 h-16 w-full" />
      <Skeleton className="mt-4 h-16 w-full" />
      <Skeleton className="mt-4 h-16 w-full" />
      <Skeleton className="mt-4 h-16 w-full" />
    </>
  );
};

export default LoadingSkeleton;
