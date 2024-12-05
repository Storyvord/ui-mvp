"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

import {
  useCreateCalenderEvents,
  useDeleteEvent,
  useGetAllCalenderEvents,
} from "@/lib/react-query/queriesAndMutations/calender";
import { useGetCrewList } from "@/lib/react-query/queriesAndMutations/crew";
import CalendarComponent from "@/components/calender/CalendarComponent";
import { CalenderFormFieldType } from "@/types";

const ProjectCalendar = ({
  openFormDialog,
  setOpenFormDialog,
  handleNavigate,
  currentDate,
  calendarType,
}: {
  openFormDialog: boolean;
  setOpenFormDialog: (value: boolean) => void;
  handleNavigate?: (date: Date) => void;
  currentDate?: Date;
  calendarType: "month" | "week" | "day" | "agenda";
}) => {
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const { id: projectId } = useParams<{ id: string }>();

  // Fetch all calendar events
  const {
    data: events,
    isPending: isEventsLoading,
    isError: isEventsError,
  } = useGetAllCalenderEvents(projectId);

  // Fetch crew list
  const {
    data: crewListData,
    isPending: isCrewLoading,
    isError: isCrewError,
  } = useGetCrewList(projectId);
  console.log(crewListData);

  // Create calendar event mutation
  const {
    mutateAsync: createCalenderEvent,
    isPending: isCreateLoading,
    isError: isCreateError,
  } = useCreateCalenderEvents();

  // Delete event mutation
  const {
    mutateAsync: deleteEvent,
    isPending: isDeleteLoading,
    isError: isDeleteError,
  } = useDeleteEvent();

  // Prepare crew list for the CalendarComponent
  // const crewList = crewListData?.accepted.map(
  //   (crew: { invited_user: { id: number }; firstName: string }) => ({
  //     value: crew.invited_user?.id,
  //     label: crew.firstName,
  //   })
  // );

  const crewList = crewListData?.results.map((crew: { role: { id: number; name: string } }) => ({
    value: 111,
    label: crew.role.name,
  }));

  const handleCreateEvent = async (formData: CalenderFormFieldType) => {
    await createCalenderEvent({ eventData: formData, projectId });
    setOpenFormDialog(false);
  };

  const handleDeleteEvent = async (eventId: number) => {
    await deleteEvent({ eventId, projectId });
    setOpenEventDialog(false);
  };

  return (
    <div className="h-screen bg-white px-4 py-2">
      {(isEventsError || isCrewError) && (
        <p className="text-center my-1 text-red-500">Error loading data.</p>
      )}
      {(isEventsLoading || isCrewLoading) && <p className="text-center mt-10">Loading...</p>}
      <CalendarComponent
        events={events?.data || []}
        calendarType={calendarType}
        crewList={crewList}
        isCreateLoading={isCreateLoading}
        isCreateError={isCreateError}
        isDeleteLoading={isDeleteLoading}
        isDeleteError={isDeleteError}
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        handleCreateEvent={handleCreateEvent}
        openEventDialog={openEventDialog}
        setOpenEventDialog={setOpenEventDialog}
        handleDeleteEvent={handleDeleteEvent}
        handleNavigate={handleNavigate}
        currentDate={currentDate}
      />
    </div>
  );
};

export default ProjectCalendar;
