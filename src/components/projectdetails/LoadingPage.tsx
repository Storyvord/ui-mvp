import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

interface LoadingPageProps {}

const LoadingPage: FC<LoadingPageProps> = ({}) => {
  return (
    <div className="mt-4 flex flex-col space-y-5 w-full overflow-hidden p-4 ">
      <Skeleton className="h-[300px] w-full rounded-xl bg-black/10" />
      <div className="space-x-4 flex">
        <Skeleton className="h-[300px] min-w-[250px] rounded-md bg-black/10" />
        <Skeleton className="h-[300px] min-w-[250px] rounded-md bg-black/10" />
        <Skeleton className="h-[300px] min-w-[250px] rounded-md bg-black/10" />
        <Skeleton className="h-[300px] min-w-[250px] rounded-md bg-black/10" />
        <Skeleton className="h-[300px] min-w-[250px] rounded-md bg-black/10" />
      </div>
    </div>
  );
};

export default LoadingPage;
