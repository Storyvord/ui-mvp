"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteEvent } from "@/lib/react-query/queriesAndMutations/calender";
import { useParams } from "next/navigation";
import Loader from "../Loader";
import { CalenderEventType } from "@/types";


const EventDialog = ({
  openDialog,
  setOpenDialog,
  event,
}: {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  event: CalenderEventType | null;
}) => {
  const { id }: { id: string } = useParams();
  const { mutateAsync, isLoading, isError } = useDeleteEvent();

  if (!event) return null; // If no event is provided, do not render anything

  const deleteEvent = async () => {
    try {
      await mutateAsync({ projectId: id, eventId: event?.id });
      if (!isError) {
        setOpenDialog(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="font-sans max-h-[85vh] overflow-auto">
        <DialogTitle className="text-[30px]">{event.title}</DialogTitle>
        <div className="text-gray-700 text-[18px]">
          <h5>
            <strong>Start:</strong> {event.start.toLocaleString()}
          </h5>
          <h5>
            <strong>End:</strong> {event.end.toLocaleString()}
          </h5>

          <h5>
            <strong>Location:</strong> {event?.location}
          </h5>

          <h5>
            <strong>Description:</strong>
            <br />
          </h5>
          {event.participants && event.participants.length > 0 && (
            <h5>
              <strong>Participants:</strong>
              {event.participants.map((participant: any) => participant + ", ")}
            </h5>
          )}
        </div>
        {isError && <p className=" my-2 text-red-600">Failed to delete event</p>}
        <div className="flex flex-wrap justify-between gap-1 w-full mt-2">
          <Button onClick={() => setOpenDialog(false)} className="w-[150px] font-bold">
            Close
          </Button>
          <Button onClick={deleteEvent} className="w-[150px] font-bold" variant="destructive">
            {isLoading ? <Loader /> : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
