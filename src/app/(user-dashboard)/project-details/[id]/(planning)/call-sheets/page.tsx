"use client";

import React, { useState, FC } from 'react';
import CreateCallSheetFormModal from './createCallSheet';
import Tabs from './tabs';
import { Button } from '@/components/ui/button';
import { CallSheet } from './types';

const Page: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Call Sheets");
  const [callSheets, setCallSheets] = useState<CallSheet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = (formData: CallSheet) => {
    setCallSheets(prevState => [...prevState, formData]);
    setIsModalOpen(false);
  };

  return (
    <div className='py-4'>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="p-2 flex flex-col items-center">
        {activeTab === "Call Sheets" && (
          <>
            <div className='text-slate-500 text-lg lg:text-xl text-center mb-2 py-2'>
              Generate ready to go, pre-populated call sheets in minutes with breakdown, schedule, and department information attached.
            </div>
            <Button
              onClick={openModal}
              className="rounded-md flex items-center space-x-2"
              variant="outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Create Call Sheet</span>
            </Button>
            <CreateCallSheetFormModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleFormSubmit} />
            <img
              src="https://face.storyvord.com/assets/callsheetss-6c088084.png"
              alt="Call Sheets"
              className="mt-8 shadow-lg rounded-md w-full lg:w-5/6"
            />
          </>
        )}

        {activeTab === "View Call Sheets" && (
          <div>
            <h2 className="text-xl mb-4">Generated Call Sheets</h2>
            <ul className="list-disc">
              {callSheets.map((sheet, index) => (
                <li key={index}>
                  Name: {sheet.name},
                  City: {sheet.city},
                  Country: {sheet.country},
                  Website: {sheet.website},
                  Contact: {sheet.contactNumber}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;