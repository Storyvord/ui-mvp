"use client";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Clapperboard, Edit2, MoreVertical, Trash2 } from "lucide-react";
import React, { FC, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import CreateCallSheetFormModal from "./createCallSheet";
import Tabs from "./tabs";
import CallSheetTemplate from "./Template/CallSheetTemplate";
import { initialFormData } from "./Template/formData";
import { CallSheet } from "./types";
import Image from "next/image";
import callSheetImg from "@/assets/callsheets.png"

const Page: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Call Sheets");
  const [callSheets, setCallSheets] = useState<CallSheet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCallSheet, setSelectedCallSheet] = useState<CallSheet | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const templateRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCallSheets = localStorage.getItem("callSheets");
      const storedSelectedCallSheet = localStorage.getItem("selectedCallSheet");
      try {
        setCallSheets(storedCallSheets ? JSON.parse(storedCallSheets) : []);
        setSelectedCallSheet(storedSelectedCallSheet ? JSON.parse(storedSelectedCallSheet) : null);
      } catch (error) {
        console.error("Error parsing stored call sheets:", error);
        setCallSheets([]);
        setSelectedCallSheet(null);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("callSheets", JSON.stringify(callSheets));
      if (selectedCallSheet) {
        localStorage.setItem("selectedCallSheet", JSON.stringify(selectedCallSheet));
      } else {
        localStorage.removeItem("selectedCallSheet");
      }
    }
  }, [callSheets, selectedCallSheet]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = (formData: CallSheet) => {
    const pdfData = generatePdfFromFormData(formData);
    const updatedCallSheets = selectedCallSheet
      ? callSheets.map((sheet) =>
          sheet === selectedCallSheet ? ({ ...formData, pdf: pdfData } as CallSheet) : sheet
        )
      : [...callSheets, { ...formData, pdf: pdfData } as CallSheet];
    setCallSheets(updatedCallSheets);
    setSelectedCallSheet({ ...formData, pdf: pdfData } as CallSheet);
    setIsModalOpen(false);
  };

  const generatePdfFromFormData = (formData: CallSheet): any => {
    const pdfData = {
      title: formData.title || "",
      date: formData.date || "",
    };
    return pdfData;
  };

  const handlePrint = useReactToPrint({
    content: () => templateRef.current,
    documentTitle: "CallSheet",
  });

  const handleEdit = () => {
    setIsModalOpen(true);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    if (!selectedCallSheet) return;
    const updatedCallSheets = callSheets.filter((sheet) => sheet !== selectedCallSheet);
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
    <div className="py-4 px-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="p-2 flex flex-col items-start">
        {activeTab === "Call Sheets" && (
          <>
            {!selectedCallSheet && (
              <div className="flex flex-col items-center w-full">
                <div className="text-slate-500 text-lg lg:text-xl text-center mb-1 py-2">
                  Generate ready to go, pre-populated call sheets in minutes with breakdown,
                  schedule, and department information attached.
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
                <Image
                  src={callSheetImg}
                  alt="Call Sheet Example"
                  layout="responsive"
                  className="mt-5 w-5/6 max-w-[80%] h-auto mx-auto"
                />
              </div>
            )}
            <CreateCallSheetFormModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onSubmit={handleFormSubmit}
              initialFormData={selectedCallSheet || initialFormData}
            />
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
                    <h4 className="text-sm font-semibold py-2 text-slate-700">
                      {selectedCallSheet.title}
                    </h4>
                    <p className="text-xs text-slate-600">
                      Date: {new Date(selectedCallSheet.date).toDateString()}
                    </p>
                    <p className="text-xs text-slate-600">
                      Shooting day: {getShootingDay(selectedCallSheet.date)}
                    </p>
                    <p className="text-xs text-slate-600">
                      Last updated: {new Date().toDateString()}
                    </p>
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
