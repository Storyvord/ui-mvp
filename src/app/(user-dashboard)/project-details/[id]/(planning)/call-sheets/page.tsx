"use client"
import React, { FC, useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import CreateCallSheetFormModal from './createCallSheet';
import Tabs from './tabs';
import CallSheetTemplate from './Template/CallSheetTemplate';
import { initialFormData } from './Template/formData';
import { CallSheet } from './types';
import { ArrowDownToLine, Clapperboard, Edit2, MoreVertical, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Page: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Call Sheets");
  const [callSheets, setCallSheets] = useState<CallSheet[]>(() => {
    const storedCallSheets = localStorage.getItem('callSheets');
    return storedCallSheets ? JSON.parse(storedCallSheets) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCallSheet, setSelectedCallSheet] = useState<CallSheet | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const templateRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('callSheets', JSON.stringify(callSheets));
  }, [callSheets]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = (formData: CallSheet) => {
    try {
      const updatedCallSheets = selectedCallSheet ? callSheets.map(sheet => sheet === selectedCallSheet ? formData : sheet) : [...callSheets, formData];
      setCallSheets(updatedCallSheets);
      setSelectedCallSheet(formData);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving call sheet:', error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => templateRef.current,
    documentTitle: 'CallSheet',
  });

  const handleEdit = () => {
    setIsModalOpen(true);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    if (!selectedCallSheet) return;
    const updatedCallSheets = callSheets.filter(sheet => sheet !== selectedCallSheet);
    setCallSheets(updatedCallSheets);
    setSelectedCallSheet(null);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getShootingDay = (dateString: string) => {
    const date = new Date(dateString);
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    return nextDay.toDateString();
  };

  return (
    <div className='py-4'>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="p-2 flex flex-col items-start">
        {activeTab === "Call Sheets" && (
          <>
            {!selectedCallSheet && (
              <div className="flex flex-col items-center">
                <div className="text-slate-500 text-sm lg:text-xl md:text-lg text-center mb-1 py-2">
                  Generate ready to go, pre-populated call sheets in minutes with breakdown, schedule, and department information attached.
                </div>

                <Button
                  onClick={openModal}
                  className="rounded-md flex items-center space-x-2 mt-2"
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
                <img src='https://face.storyvord.com/assets/callsheetss-6c088084.png' alt="Call Sheet Example" className="mt-5 w-5/6 max-w-full h-auto" />

              </div>
            )}
            <CreateCallSheetFormModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleFormSubmit} initialFormData={selectedCallSheet || initialFormData} />
            {selectedCallSheet && (
              <div className="mt-3 shadow-lg rounded-md w-full lg:w-1/3 md:w-3/5 p-2 relative bg-white">
                <div className="absolute top-4 right-2">
                  <MoreVertical onClick={toggleMenu} className="cursor-pointer" />
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg">
                      <Button
                        className="w-full flex space-x-1 px-2 py-1 text-left"
                        variant="ghost"
                        onClick={handleEdit}
                      >
                        <Edit2 className="w-4 h-4" /> <span>Edit Sheet</span>
                      </Button>
                      <Button
                        className="w-full flex space-x-1 px-2 py-1 text-left"
                        variant="ghost"
                        onClick={handlePrint}
                      >
                        <ArrowDownToLine className="w-4 h-4" /> <span>Download</span>
                      </Button>
                      <Button
                        className="w-full flex space-x-1 px-2 py-1 text-left"
                        variant="ghost"
                        onClick={handleDelete}
                      >
                        <Trash2 className="w-4 h-4" /> <span>Remove</span>
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex items-center p-4 rounded-md">
                  <Clapperboard className="text-gray-900 w-8 h-8 mr-4" />
                  <div>
                    <h4 className="text-sm font-semibold py-2 text-slate-700">{selectedCallSheet.title}</h4>
                    <p className='text-xs text-slate-600'>Date: {new Date(selectedCallSheet.date).toDateString()}</p>
                    <p className='text-xs text-slate-600'>Shooting day: {getShootingDay(selectedCallSheet.date)}</p>
                    <p className='text-xs text-slate-600'>Last updated: {new Date().toDateString()}</p>
                  </div>
                </div>
                <div className="hidden">
                  <CallSheetTemplate ref={templateRef} formData={selectedCallSheet} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
