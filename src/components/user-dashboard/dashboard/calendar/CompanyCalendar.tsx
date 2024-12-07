"use client";

import React, { useState } from "react";

import {
  useCreateCompanyCalenderEvents,
  useDeleteCompanyCalenderEvent,
  useEditCompanyCalenderEvent,
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

  const {
    mutateAsync: editEvent,
    isPending: isEditLoading,
    isError: isEditError,
  } = useEditCompanyCalenderEvent();

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

  const handleEditEvent = async (eventId: number, formData: CalenderFormFieldType) => {
    await editEvent({ eventId, eventData: formData });
  };

  return (
    <div className="">
      {isEventsError && <p className="text-center my-1 text-red-500">Error loading data.</p>}
      {isEventsLoading && <p className="text-center mt-10">Loading...</p>}
      <CalendarComponent
        events={events?.data?.user_calendar_events || []}
        calendarType={calendarType}
        crewList={crewList}
        isCreateLoading={isCreateLoading}
        isCreateError={isCreateError}
        isDeleteLoading={isDeleteLoading}
        isDeleteError={isDeleteError}
        isEditLoading={isEditLoading}
        isEditError={isEditError}
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        handleCreateEvent={handleCreateEvent}
        openEventDialog={openEventDialog}
        setOpenEventDialog={setOpenEventDialog}
        handleDeleteEvent={handleDeleteEvent}
        handleEditEvent={handleEditEvent}
        handleNavigate={handleNavigate}
        currentDate={currentDate}
      />
    </div>
  );
};

export default CompanyCalender;
