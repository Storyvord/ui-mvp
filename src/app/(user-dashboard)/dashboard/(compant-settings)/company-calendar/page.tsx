"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import AddEvent from "@/components/calender/AddEvent";
import EventDialog from "@/components/calender/EventDialog";
import { CalenderEventType, CalenderFormFieldType } from "@/types";
import {
  useCreateCompanyCalenderEvents,
  useDeleteCompanyCalenderEvent,
  useGetCompanyCalenderEvents,
} from "@/lib/react-query/queriesAndMutations/company/calender";
import { useGetSendInvitationsList } from "@/lib/react-query/queriesAndMutations/company/employee";

const localizer = momentLocalizer(moment);

const CompanyCalender = () => {
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [eventToDisplay, setEventToDisplay] = useState<CalenderEventType | null>(null);
  const [transformEvents, setTransformEvents] = useState();

  const { data: events } = useGetCompanyCalenderEvents();
  const {
    mutateAsync: createCalenderEvent,
    isPending: createEventLoading,
    isError: createEventError,
  } = useCreateCompanyCalenderEvents();
  const {
    mutateAsync: deleteEvent,
    isPending: deleteEventLoading,
    isError: deleteEventError,
  } = useDeleteCompanyCalenderEvent();

  const { data: employee_list } = useGetSendInvitationsList();
  const employeeList = employee_list?.accepted.map(
    (employee: { firstName: string; invited_user: { id: number }; employee_email: string }) => ({
      value: employee.invited_user.id,
      label: employee.firstName || employee.employee_email,
    })
  );

  const handleCreateEvent = async (formData: CalenderFormFieldType) => {
    const transformData = {
      ...formData,
      participants: formData.participants,
    };
    const res = await createCalenderEvent(transformData);
    if (res) setOpenFormDialog(false);
  };

  const handleDeleteEvent = async (eventId: number) => {
    await deleteEvent(eventId);
    if (!deleteEventError) {
      setOpenFormDialog(false);
    }
  };

  useEffect(() => {
    const transformEvents = events?.map((event: any) => ({
      ...event,
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
    }));
    setTransformEvents(transformEvents);
  }, [events]);

  const [formDefaultValue, setFormDefaultValue] = useState({
    start: "",
    end: "",
    title: "",
    description: "",
    location: "",
    participants: [],
  });

  const handleSelectSlot = ({ start }: any) => {
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
          events={transformEvents}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          startAccessor="start"
          endAccessor="end"
          selectable
        />
      </div>
      <AddEvent
        openDialog={openFormDialog}
        setOpenDialog={setOpenFormDialog}
        formDefaultValue={formDefaultValue}
        createCalenderEvent={handleCreateEvent}
        isLoading={createEventLoading}
        isError={createEventError}
        crewList={employeeList}
      />
      <EventDialog
        event={eventToDisplay}
        openDialog={openEventDialog}
        setOpenDialog={setOpenEventDialog}
        deleteEvent={handleDeleteEvent}
        isLoading={deleteEventLoading}
        isError={deleteEventError}
        crewList={employeeList}
      />
    </div>
  );
};

export default CompanyCalender;
