"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useGetAllCalenderEvents } from "@/lib/react-query/queriesAndMutations/calender";
import AddEvent from "@/components/calender/AddEvent";
import EventDialog from "@/components/calender/EventDialog";
import { CalenderEventType } from "@/types";

moment.tz.setDefault('UTC');
const localizer = momentLocalizer(moment);

const MyCalendarPage = () => {
  const { id }: { id: string } = useParams();
  const { data:events } = useGetAllCalenderEvents(id);

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [eventToDisplay, setEventToDisplay] = useState<CalenderEventType | null>(null);


  const [formDefaultValue, setFormDefaultValue] = useState({
    start: "",
    end: "",
    title: "",
    description: "",
    location: "",
  });

  const handleSelectSlot = ({start}: any) => {
    console.log(start)
   
    setOpenFormDialog(true);
  };

  const handleSelectEvent = (event: CalenderEventType) => {
    setEventToDisplay(event);
    setOpenEventDialog(true);
  };

  return (
    <div className="h-auto bg-white p-4">
      <Button
        onClick={() => setOpenFormDialog(true)}
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
        openDialog={openFormDialog}
        setOpenDialog={setOpenFormDialog}
        formDefaultValue={formDefaultValue}
      />
      <EventDialog
        event={eventToDisplay}
        openDialog={openEventDialog}
        setOpenDialog={setOpenEventDialog}
      />
    </div>
  );
};

export default MyCalendarPage;
