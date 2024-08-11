"use client";
import EmailChange from "@/components/crew/settings/EmailChange";
import Tabs from "@/components/Tabs";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const tabs = ["Payout", "Taxes", "Change Email", "Change Password"];

export const resetEmailFormField = [
  {
    name: "new-email",
    label: "New Email",
    type: "email",
    placeholder: "enter new email",
  },
  {
    name: "confirm-email",
    label: "Confirm Email",
    type: "email",
    placeholder: "enter confirm email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];

export const resetPasswordFormField = [
  {
    name: "old-password",
    label: "Old Password",
    type: "password",
    placeholder: "enter old password",
  },

  {
    name: "new-password",
    label: "New Password",
    type: "password",
    placeholder: "enter new password",
  },
  {
    name: "confirm-password",
    label: "Confirm Password",
    type: "password",
    placeholder: "enter confirm password",
  },
];
const Settings = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div>
      <h1 className=" text-2xl font-semibold">Settings</h1>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} className="mt-4" />
      {activeTab === tabs[0] && (
        <div className=" mt-4 w-full flex flex-col items-center gap-2">
          <h1 className=" text-xl">Payout</h1>
          <h3 className=" text-md">Select how to receive money you have earned on Glimmer. </h3>
          <Button className=" mx-auto">Add Payout method</Button>
        </div>
      )}
      {activeTab === tabs[2] && <EmailChange formFields={resetEmailFormField} />}
      {activeTab === tabs[3] && <EmailChange formFields={resetPasswordFormField} />}
    </div>
  );
};

export default Settings;
