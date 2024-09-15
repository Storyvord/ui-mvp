"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useGetAllCrewCalenderEvents } from "@/lib/react-query/queriesAndMutations/crew/calendar";
import EventDialog from "@/components/calender/EventDialog";
import { CalenderEventType } from "@/types";
const localizer = momentLocalizer(moment);

const Calender = () => {
  const [transformEvents, setTransformEvents] = useState();
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [eventToDisplay, setEventToDisplay] = useState<CalenderEventType | null>(null);

  const { data: events } = useGetAllCrewCalenderEvents();
  useEffect(() => {
    const data = events?.flatMap((item: any) => item.events);
    const transformEvents = data?.map((event: any) => ({
      ...event,
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
    }));
    setTransformEvents(transformEvents);
  }, [events]);

  const handleSelectEvent = (event: CalenderEventType) => {
    setEventToDisplay(event);
    setOpenEventDialog(true);
  };

  return (
    <div className=" h-screen">
      <Calendar
        localizer={localizer}
        events={transformEvents}
        onSelectEvent={handleSelectEvent}
        startAccessor="start"
        endAccessor="end"
        selectable
      />
      <EventDialog
        event={eventToDisplay}
        openDialog={openEventDialog}
        setOpenDialog={setOpenEventDialog}
      />
    </div>
  );
};

export default Calender;
