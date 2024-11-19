"use client";

import React, { useState } from "react";

import {
  useCreateCompanyCalenderEvents,
  useDeleteCompanyCalenderEvent,
  useGetCompanyCalenderEvents,
} from "@/lib/react-query/queriesAndMutations/company/calender";
import { useGetSendInvitationsList } from "@/lib/react-query/queriesAndMutations/company/employee";
import CalendarComponent from "@/components/calender/CalendarComponent";
import { CalenderFormFieldType } from "@/types";

const CompanyCalender = ({
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
  // Fetch all calendar events
  const {
    data: events,
    isPending: isEventsLoading,
    isError: isEventsError,
  } = useGetCompanyCalenderEvents();

  // Fetch crew list (employees)
  const {
    data: employeeListData,
    isPending: isCrewLoading,
    isError: isCrewError,
  } = useGetSendInvitationsList();

  // Create calendar event mutation
  const {
    mutateAsync: createCalenderEvent,
    isPending: isCreateLoading,
    isError: isCreateError,
  } = useCreateCompanyCalenderEvents();

  // Delete event mutation
  const {
    mutateAsync: deleteEvent,
    isPending: isDeleteLoading,
    isError: isDeleteError,
  } = useDeleteCompanyCalenderEvent();

  // Prepare crew list for the CalendarComponent
  const crewList = employeeListData?.accepted.map(
    (employee: { firstName: string; invited_user: { id: number }; employee_email: string }) => ({
      value: employee.invited_user.id,
      label: employee.firstName || employee.employee_email,
    })
  );
  const handleCreateEvent = async (formData: CalenderFormFieldType) => {
    await createCalenderEvent(formData);
    setOpenFormDialog(false);
  };

  const handleDeleteEvent = async (eventId: number) => {
    await deleteEvent(eventId);
    setOpenEventDialog(false);
  };

  // Loading state
  if (isEventsLoading || isCrewLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Error state
  if (isEventsError || isCrewError) {
    return <div className="text-center mt-10 text-red-500">Error loading data.</div>;
  }

  return (
    <div className="h-screen">
      <CalendarComponent
        events={events || []}
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

export default CompanyCalender;
