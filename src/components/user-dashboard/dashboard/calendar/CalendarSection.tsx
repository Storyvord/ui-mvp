"use client";
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";


import { Button } from "@/components/ui/button";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarSection = () => {
  return (
    <div className=" mt-8">
      <header className=" flex justify-between items-center mb-4">
        <span className=" flex gap-2 items-center">
          <img src="/icons/calendar.svg" alt="" />
          <h1 className=" text-lg">Calendar</h1>
        </span>
        <Button className=" flex gap-2">
          <img src="/icons/plus-2.svg" alt="" /> Add Event
        </Button>
      </header>
      <Calendar
        localizer={localizer}
        // events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalendarSection;
