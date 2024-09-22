import React, { useEffect } from "react";
import { useDeleteAnnouncement } from "@/lib/react-query/queriesAndMutations/announcements";

import { useToast } from "@/components/ui/use-toast";
import AnnouncementCard from "./AnnouncementCard";

type AnnouncementProps = {
  title: string;
  message: string;
  id: number;
};

const Announcement: React.FC<AnnouncementProps> = ({ title, message, id }) => {
  const { toast } = useToast();
  const { mutateAsync, isPending, isError } = useDeleteAnnouncement();

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    }
  }, [isError, toast]);

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Deletion failed!",
        description: "There was an error deleting the announcement.",
      });
    }
  };

  return (
    <AnnouncementCard
      title={title}
      message={message}
      isLoading={isPending}
      onDelete={handleDelete}
    />
  );
};

export default Announcement;
