"use client";
import React from "react";
import {getDay, startOfWeek, parse, format} from "date-fns";
import enUS from "date-fns/locale/en-US";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Button } from "@/components/ui/button";

const locales = {
  "en-US": enUS,
};

const myEventsList = [
  {
    title: "Meeting with Team",
    start: new Date(2024, 9, 1, 10, 0),
    end: new Date(2024, 9, 1, 12, 0),
    description: "Discuss project milestones and deadlines.",
    type: "meeting",
  },
  {
    title: "Project Deadline",
    start: new Date(2024, 10, 25, 17, 0),
    end: new Date(2024, 10, 25, 17, 0),
    description: "Final submission of the project.",
    type: "deadline",
  },
  // Add more events here
];

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
      <header className=" flex justify-between items-center">
        <span className=" flex gap-2 items-center">
          <img src="/icons/calendar.svg" alt="" />
          <h1 className=" text-xl">Calendar</h1>
        </span>
        <Button className=" flex gap-2">
          <img src="/icons/plus-2.svg" alt="" /> Add Event
        </Button>
      </header>
      <div className=" bg-white p-4 rounded-xl border mt-2">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          defaultView="week"
        />
      </div>
    </div>
  );
};

export default CalendarSection;
