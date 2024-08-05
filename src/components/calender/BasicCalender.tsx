"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { eventList } from "@/constant/constant";
import EventDialog from "./EventDialog";
import AddEvent from "./AddEvent";

const localizer = momentLocalizer(moment);

const BasicCalender = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [events, setEvents] = useState(eventList);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleCloseEventDialog = () => {
    setEventToDisplay(null);
    setIsEventDialogOpen(false);
  };
  const [eventToDisplay, setEventToDisplay] = useState(null);
  const [formDefaultValue, setFormDefaultValue] = useState({
    start: "",
    end: "",
    title: "test",
    description: "",
    location: "",

  });




  const handleSelectSlot = () => {
    setIsDialogOpen(true);
  };

  const handleSelectEvent = (event) => {
    setEventToDisplay(event);
    setIsEventDialogOpen(true);
  };

  console.log(events);

  return (
    <div>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="mb-2 uppercase bg-blue-500 hover:bg-blue-700 font-bold"
      >
        Add new Event
      </Button>
      <div className="h-[90vh]">
        <Calendar
          localizer={localizer}
          events={events}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
        />
      </div>
      <AddEvent
        openDialog={isDialogOpen}
        setOpenDialog={handleCloseDialog}
        formDefaultValue={formDefaultValue}
      />
      <EventDialog
        event={eventToDisplay}
        open={isEventDialogOpen}
        onClose={handleCloseEventDialog}
      />
    </div>
  );
};

export default BasicCalender;