import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

interface JobPosition {
  title: string;
  location: string;
  type: string;
  description: string;
}

interface JobPositionCardProps {
  job: JobPosition;
}

export default function JobPositionCard({ job }: JobPositionCardProps) {
  return (
    <Card className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent>
        <CardTitle className="text-lg font-semibold">{job.title}</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {job.location} | {job.type}
        </CardDescription>
        <p className="mt-2 text-gray-800">{job.description}</p>
      </CardContent>
    </Card>
  );
}
