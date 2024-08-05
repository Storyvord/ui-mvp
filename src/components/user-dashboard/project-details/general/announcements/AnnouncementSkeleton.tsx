import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AnnouncementSkeleton = () => {
  return (
    <section
      className="mt-4 grid gap-4 ml-4"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(24rem, 1fr))" }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Card key={index} className=" max-w-96 relative">
          <CardHeader>
            <Skeleton className=" h-6 w-3/4 " />
          </CardHeader>
          <div className=" absolute top-4 right-2">
            <Skeleton className=" h-6 w-6 " />
          </div>
          <div className=" flex items-center gap-3 mt-2">
            <Skeleton className=" h-10 w-10 rounded-full " />
            <Skeleton className=" h-6 w-1/4" />
          </div>
          <CardContent>
            <Skeleton className=" mt-4 h-6 w-full " />
            <Skeleton className=" mt-2 h-6 w-5/6 " />
            <Skeleton className=" mt-2 h-6 w-3/4 " />
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default AnnouncementSkeleton;
