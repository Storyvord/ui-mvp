"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Loader from "../Loader";
import { CalenderEventType } from "@/types";
import moment from "moment";

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

  const participants = event.participants
    .map((valueToFind) => {
      const foundObject = crewList?.find((item) => Number(item.value) === valueToFind);
      return foundObject ? foundObject.label : null;
    })
    .filter((label) => label !== null);

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="font-sans max-h-[85vh] overflow-auto lg:w-[700px] w-[95%]">
          <DialogTitle className="text-2xl">{event.title}</DialogTitle>
          <div className="text-gray-700 text-[18px]">
            <h5>
              <strong>Start:</strong> {moment(event.start).format("DD-MM-YYYY")},{" "}
              {moment(event.start).format("HH:mm")}
            </h5>
            <h5>
              <strong>End:</strong> {moment(event.end).format("DD-MM-YYYY")},{" "}
              {moment(event.end).format("HH:mm")}
            </h5>

            <h5>
              <strong>Location:</strong> {event?.location}
            </h5>

            <h5>
              <strong>Description:</strong>
              {event?.description}
              <br />
            </h5>

            {participants && (
              <h5>
                <strong>Participants:</strong>
                {participants?.map((participant: any) => participant + ", ")}
              </h5>
            )}
          </div>
          {isError && <p className=" my-2 text-red-600">Failed to delete event</p>}
          <div className="flex flex-wrap justify-between gap-1 w-full mt-2">
            <Button onClick={() => setOpenDialog(false)} className="w-[150px] font-bold">
              Close
            </Button>
            {deleteEvent && (
              <Button
                disabled={isLoading}
                onClick={() => deleteEvent(event?.id)}
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
