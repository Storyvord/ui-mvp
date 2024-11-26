"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Loader from "../Loader";
import { CalenderEventType } from "@/types";
import { format } from "date-fns";

type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  event: CalenderEventType | null;
  deleteEvent?: (eventId: number) => void;
  isLoading?: boolean;
  isError?: boolean;
  crewList?: { value: string; label: string }[];
};

const EventDialog = ({
  openDialog,
  setOpenDialog,
  event,
  deleteEvent,
  isLoading,
  isError,
  crewList,
}: Props) => {
  if (!event) return null; // If no event is provided, do not render anything

  // Format dates using date-fns
  const formattedStartDate = format(new Date(event.start), "dd-MM-yyyy");
  const formattedStartTime = format(new Date(event.start), "HH:mm");
  const formattedEndDate = format(new Date(event.end), "dd-MM-yyyy");
  const formattedEndTime = format(new Date(event.end), "HH:mm");

  const participants = event?.participants
    ?.map((valueToFind) => {
      const foundObject = crewList?.find((item) => Number(item.value) === valueToFind);
      return foundObject ? foundObject.label : null;
    })
    .filter((label) => label !== null);

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="font-sans max-h-[85vh] overflow-auto lg:w-[700px] w-[95%]">
          <DialogTitle className="text-2xl">{event.title}</DialogTitle>
          <div className="text-gray-700 text-[18px] space-y-2">
            <h5>
              <strong>Start:</strong> {formattedStartDate}, {formattedStartTime}
            </h5>
            <h5>
              <strong>End:</strong> {formattedEndDate}, {formattedEndTime}
            </h5>

            {event.location && (
              <h5>
                <strong>Location:</strong> {event.location}
              </h5>
            )}

            {event.description && (
              <h5>
                <strong>Description:</strong> {event.description}
              </h5>
            )}

            {participants && participants.length > 0 && (
              <h5>
                <strong>Participants:</strong> {participants.join(", ")}
              </h5>
            )}
          </div>
          {isError && <p className="my-2 text-red-600">Failed to delete event</p>}
          <div className="flex flex-wrap justify-between gap-1 w-full mt-4">
            <Button onClick={() => setOpenDialog(false)} className="w-[150px] font-bold">
              Close
            </Button>
            {deleteEvent && (
              <Button
                disabled={isLoading}
                onClick={() => deleteEvent(event.id)}
                className="w-[150px] font-bold"
                variant="destructive"
              >
                {isLoading ? <Loader /> : "Delete"}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventDialog;
