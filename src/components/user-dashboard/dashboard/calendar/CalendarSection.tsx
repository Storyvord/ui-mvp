"use client";

import React, { useState, useEffect } from "react";
import {
  getDay,
  startOfWeek,
  parse,
  format,
  isWithinInterval,
  addDays,
  parseISO,
  toDate,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar, dateFnsLocalizer, Event as RBCEvent } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Button } from "@/components/ui/button";
import DatePickerWithRange from "./DatePickerWithRange";
import AddEvent from "./AddEvent";
import {
  useCreateCompanyCalenderEvents,
  useGetCompanyCalenderEvents,
} from "@/lib/react-query/queriesAndMutations/company/calender";
import { useGetSendInvitationsList } from "@/lib/react-query/queriesAndMutations/company/employee";
import { CalenderFormFieldType } from "@/types";

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
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const allEvents: Event[] = [
  {
    title: "Meeting with Team",
    start: new Date(2024, 9, 14, 10, 0),
    end: new Date(2024, 9, 14, 12, 0),
    description: "Discuss project milestones and deadlines.",
    type: "meeting",
  },
  {
    title: "Project Deadline",
    start: new Date(2024, 9, 15, 8, 0),
    end: new Date(2024, 9, 15, 12, 0),
    description: "Final submission of the project.",
    type: "deadline",
  },
];

const CalendarSection = () => {
  const [selectedRange, setSelectedRange] = useState<any | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const [myEventsList, setMyEventsList] = useState<Event[]>(allEvents);
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // Keep track of the current date
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [transformEvents, setTransformEvents] = useState();
  const [formDefaultValue, setFormDefaultValue] = useState({
    start: "",
    end: "",
    title: "",
    description: "",
    location: "",
    participants: [],
  });

  const { data: events } = useGetCompanyCalenderEvents();
  const {
    mutateAsync: createCalenderEvent,
    isPending: createEventLoading,
    isError: createEventError,
  } = useCreateCompanyCalenderEvents();
  const { data: employee_list } = useGetSendInvitationsList();
  const employeeList = employee_list?.accepted.map(
    (employee: { firstName: string; invited_user: { id: number }; employee_email: string }) => ({
      value: employee.invited_user.id,
      label: employee.firstName || employee.employee_email,
    })
  );

  useEffect(() => {
    const transformEvents = events?.map((event: any) => ({
      ...event,
      start: toDate(parseISO(event.start)), // Parse the ISO string and convert it to Date
      end: toDate(parseISO(event.end)), // Parse the ISO string and convert it to Date
    }));
    setTransformEvents(transformEvents);
  }, [events]);

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

  const handleNavigate = (date: Date) => {
    setCurrentDate(date); // Update the current date
  };

  const handleCreateEvent = async (formData: CalenderFormFieldType) => {
    return;
    // const transformData = {
    //   ...formData,
    //   participants: formData.participants,
    // };
    // const res = await createCalenderEvent(transformData);
    // if (res) setOpenFormDialog(false);
  };
  return (
    <div className="mt-8">
      <header className="flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <img src="/icons/calendar.svg" alt="Calendar Icon" />
          <h1 className="text-xl">Calendar</h1>
        </span>
        <Button onClick={() => setOpenFormDialog(true)} className="flex gap-2">
          <img src="/icons/plus-2.svg" alt="Add Icon" /> Add Event
        </Button>
      </header>
      <main className="flex xl:flex-row flex-col md:items-start gap-3 mt-4">
        <DatePickerWithRange onSelectRange={handleSelectRange} />
        <div className="bg-white px-4 py-2 rounded-xl border flex-1">
          <h2 className=" text-lg mb-2 font-semibold text-gray-700">My Schedule</h2>
          <Calendar
            localizer={localizer}
            events={transformEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            defaultView="week"
            date={currentDate} // Use the currentDate state
            onNavigate={handleNavigate} // Handle navigation to update current date
            selectable // Make slots selectable
            // onSelectSlot={handleSelectSlot} //
            // onSelectEvent={handleSelectEvent}
          />
        </div>
      </main>
      <AddEvent
        openDialog={openFormDialog}
        setOpenDialog={setOpenFormDialog}
        formDefaultValue={formDefaultValue}
        createCalenderEvent={handleCreateEvent}
        isLoading={createEventLoading}
        isError={createEventError}
        crewList={employeeList}
      />
    </div>
  );
};

export default CalendarSection;
