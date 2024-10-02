"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import {
  useCreateCalenderEvents,
  useDeleteEvent,
  useGetAllCalenderEvents,
} from "@/lib/react-query/queriesAndMutations/calender";
import AddEvent from "@/components/calender/AddEvent";
import EventDialog from "@/components/calender/EventDialog";
import { CalenderEventType, CalenderFormFieldType } from "@/types";
import { useGetCrewList } from "@/lib/react-query/queriesAndMutations/crew";

const localizer = momentLocalizer(moment);

const MyCalendarPage = () => {
  const { id: projectId }: { id: string } = useParams();

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [eventToDisplay, setEventToDisplay] = useState<CalenderEventType | null>(null);
  const [transformEvents, setTransformEvents] = useState();

  const { data: events } = useGetAllCalenderEvents(projectId);
  const {
    mutateAsync: createCalenderEvent,
    isPending: createEventLoading,
    isError: createEventError,
  } = useCreateCalenderEvents();
  const {
    mutateAsync: deleteEvent,
    isPending: deleteEventLoading,
    isError: deleteEventError,
  } = useDeleteEvent();
  const { data: crew_list } = useGetCrewList(projectId);
  const crewList = crew_list?.accepted.map(
    (crew: { invited_user: { id: number }; firstName: string }) => ({
      value: crew.invited_user?.id,
      label: crew.firstName,
    })
  );

  const [formDefaultValue, setFormDefaultValue] = useState({
    start: "",
    end: "",
    title: "",
    participants: [],
    description: "",
    location: "",
  });

  const handleSelectSlot = ({ start }: any) => {
    setOpenFormDialog(true);
  };

  const handleSelectEvent = (event: CalenderEventType) => {
    setEventToDisplay(event);
    setOpenEventDialog(true);
  };

  const handleCreateEvent = async (formData: CalenderFormFieldType) => {
    const res = await createCalenderEvent({ eventData: formData, projectId });
    if (res) setOpenFormDialog(false);
  };

  const handleDeleteEvent = async (eventId: number) => {
    const res = await deleteEvent({ projectId, eventId });
    if (res.ok) {
      setOpenEventDialog(false);
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
        crewList={crewList}
      />
      <EventDialog
        event={eventToDisplay}
        openDialog={openEventDialog}
        setOpenDialog={setOpenEventDialog}
        deleteEvent={handleDeleteEvent}
        isLoading={deleteEventLoading}
        isError={deleteEventError}
        crewList={crewList}
      />
    </div>
  );
};

export default MyCalendarPage;
