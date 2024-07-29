import { Skeleton } from "@/components/ui/skeleton";

const TaskSkeleton = () => {
  return (
    <div className="py-2 gap-2 items-center w-full">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex mt-4 w-full h-full items-center gap-2 justify-between py-4 px-2 rounded-md bg-slate-200"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="w-[20px] h-[20px] rounded-full bg-slate-300" />
            <Skeleton className="w-[100px] h-[20px] rounded-full bg-slate-300" />
          </div>
          <div className="flex gap-2 items-center">
            <div className="hidden sm:block font-sans mr-10 text-center">
              <Skeleton className="w-[80px] h-[10px] rounded-full bg-slate-300" />
              <Skeleton className="w-[100px] h-[14px] rounded-full mt-1 bg-slate-300" />
            </div>
            <Skeleton className="w-[32px] h-[32px] rounded-full bg-slate-300" />
            <Skeleton className="w-[32px] h-[32px] rounded-full bg-slate-300" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskSkeleton;
