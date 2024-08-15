"use client"
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);


const Calender = () => {
  return (
    <div className=" h-screen">
      <Calendar
        localizer={localizer}
        // events={transformEvents}
        // onSelectSlot={handleSelectSlot}
        // onSelectEvent={handleSelectEvent}
        startAccessor="start"
        endAccessor="end"
        selectable
      />
    </div>
  );
};

export default Calender;
