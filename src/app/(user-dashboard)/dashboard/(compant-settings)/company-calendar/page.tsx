"use client";
import { Button } from "@/components/ui/button";
import CompanyCalender from "@/components/user-dashboard/dashboard/calendar/CompanyCalendar";
import React, { useState } from "react";

const CompanyCalendarPage = () => {
  const [openFormDialog, setOpenFormDialog] = useState(false);

  return (
    <div className=" pt-4 bg-white p-8">
      <Button
        onClick={() => setOpenFormDialog(true)}
        className=" uppercase bg-green-500 hover:bg-green-700 font-bold mb-4"
      >
        Add New Event
      </Button>
      <CompanyCalender
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        calendarType="month"
      />
    </div>
  );
};

export default CompanyCalendarPage;
