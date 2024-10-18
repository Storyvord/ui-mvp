"use client";

import React, { useState, useEffect } from "react";
import { getDay, startOfWeek, parse, format, isWithinInterval, addDays } from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar, dateFnsLocalizer, Event as RBCEvent } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "./DatePickerWithRange";

interface Event extends RBCEvent {
  description?: string;
  type?: string;
}

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }), // Sunday
  getDay,
  locales,
});

const allEvents: Event[] = [
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
];

const CalendarSection = () => {
  const [selectedRange, setSelectedRange] = useState<any | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const [myEventsList, setMyEventsList] = useState<Event[]>([]);

  useEffect(() => {
    if (selectedRange && selectedRange.from && selectedRange.to) {
      const filteredEvents = allEvents.filter((event) =>
        isWithinInterval(event.start, {
          start: selectedRange.from,
          end: selectedRange.to,
        })
      );
      setMyEventsList(filteredEvents);
    } else {
      setMyEventsList(allEvents);
    }
  }, [selectedRange]);

  const handleSelectRange = (range: Range | undefined) => {
    setSelectedRange(range);
  };

  const currentDate = selectedRange?.from || new Date();

  return (
    <div className="mt-8">
      <header className="flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <img src="/icons/calendar.svg" alt="Calendar Icon" />
          <h1 className="text-xl">Calendar</h1>
        </span>
        <Button className="flex gap-2">
          <img src="/icons/plus-2.svg" alt="Add Icon" /> Add Event
        </Button>
      </header>
      <main className="flex md:flex-row flex-col md:items-start gap-3 mt-4">
        <DatePickerWithRange onSelectRange={handleSelectRange} />
        <div className="bg-white px-4 py-2 rounded-xl border flex-1">
          <h2 className=" text-lg mb-2 font-semibold text-gray-700">My Schedule</h2>
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            defaultView="week"
            // views={["week", "day", "agenda"]}
            date={currentDate}
            onNavigate={(date, view) => {
              // Optionally handle navigation if needed
            }}
            onSelectEvent={(event) => {
              alert(`Event: ${event.title}\nDescription: ${event.description}`);
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default CalendarSection;
