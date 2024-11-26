"use client";
import { Button } from "@/components/ui/button";
import CompanyCalender from "@/components/user-dashboard/dashboard/calendar/CompanyCalendar";
import ProjectCalendar from "@/components/user-dashboard/project-details/calendar/ProjectCalendar";
import React, { useState } from "react";

const CompanyCalendarPage = () => {
  const [openFormDialog, setOpenFormDialog] = useState(false);

  return (
    <div className=" pt-2 p-4">
      <Button
        onClick={() => setOpenFormDialog(true)}
        className=" uppercase bg-green-500 hover:bg-green-700 font-bold mb-4"
      >
        Add New Event
      </Button>
      <ProjectCalendar
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        calendarType="month"
      />
    </div>
  );
};

export default CompanyCalendarPage;
