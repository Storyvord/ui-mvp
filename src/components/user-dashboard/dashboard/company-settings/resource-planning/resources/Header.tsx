"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { IoListOutline } from "react-icons/io5";
import { TfiViewGrid } from "react-icons/tfi";
import { GrFormSchedule } from "react-icons/gr";
import { MdOutlineFileDownload } from "react-icons/md";
import { BsFiletypePdf, BsFiletypeCsv,BsFiletypeXls } from "react-icons/bs";
import CreateResource from "./CreateResource";
import {motion } from 'framer-motion'
import { CreateResourceType } from "../type";


type HeaderProps = {
  list: boolean;
  isFormVisible : boolean;
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>; 
  handleFormVisible: () => void;
  handleClickListView: () => void;
  onSubmit: (data: CreateResourceType) => void; 
};

const Header: React.FC<HeaderProps> = ({ list, isFormVisible, handleClickListView, handleFormVisible, setIsFormVisible, onSubmit }) => {
  const [modalSearch, setModalSearch] = useState(false);
  const [isExportShow, setIsExportShow] = useState(false)

  const handleClickModalSearch = () => {
    setModalSearch(!modalSearch);
  };

  const handleClickExport = () => {
    setIsExportShow(!isExportShow)
  }
  

  return (
    <div className="w-full z-20">
      <div className="md:flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleFormVisible}
          className="md:w-auto w-full flex items-center gap-2  hover:bg-gray-50 "
        >
          <FiPlus size={18} />
          Create resource category
        </Button>

        <div className="md:flex md:mt-0 mt-3 gap-4 items-center">
          {/* search bar */}
          <div className="md:w-auto w-full flex items-start gap-2 cursor-pointer">
            <div className="flex flex-col items-center">
              <div
                onClick={handleClickModalSearch}
                className="p-2 border border-gray-300 hover:bg-gray-50 bg-white rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
              >
                <IoIosSearch size={18} />
              </div>
              <p className="text-[10px] mt-1 font-medium">Search</p>
            </div>
            {modalSearch && (
              <input
                type="search"
                placeholder="Search"
                className="w-full p-2 border border-gray-300 hover:bg-gray-50 bg-white rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
              />
            )}
          </div>

          <div className="flex md:items-center gap-4 items-end justify-end">

          {/* list view */}
          <div className="flex flex-col items-center">
            <div
              onClick={handleClickListView}
              className="p-2 border border-gray-300 hover:bg-gray-50 bg-white rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
            >
              {list ? <IoListOutline size={18} /> : <TfiViewGrid size={18} />}
            </div>
            {list ? (
              <p className="text-[10px] mt-1 font-medium">List view</p>
            ) : (
              <p className="text-[10px] mt-1 font-medium">Tile view</p>
            )}
          </div>

          {/* schedular */}
          <div className="flex flex-col items-center">
            <div className="p-2 border border-gray-300 hover:bg-gray-50 bg-white rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm">
              <GrFormSchedule size={18} />
            </div>
            <p className="text-[10px] mt-1 font-medium">Schedular</p>
          </div>
      

         {/* export */}
         <div className="flex flex-col items-center relative">
          <div className="">
            <div onClick={handleClickExport} className="p-2 border border-gray-300 hover:bg-gray-50 bg-white rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm">
              <MdOutlineFileDownload size={18} />
            </div>
            <p className="text-[10px] mt-1 font-medium">Export</p>
          </div>
         {
          isExportShow && (
            <div className="absolute border top-10 right-0 bg-white p-4 rounded-md w-[250px] shadow-lg ">
            <div className="w-full">
              <p className="text-[10px] font-semibold ">PDF-EXPORTS</p>  
              <div onClick={() => setIsExportShow(false)} className="flex hover:bg-gray-50 py-3 px-3 rounded-lg  w-full cursor-pointer items-center gap-3 mt-3"><BsFiletypePdf size={18} /> <p className="text-[14px] text-gray-500 hover:text-black font-medium">Download as pdf file</p></div>

              <p className="text-[10px] font-semibold mt-5 ">OTHER-EXPORTS</p>  
              <div onClick={() => setIsExportShow(false)} className="flex w-full hover:bg-gray-50 py-3 px-3 rounded-lg  cursor-pointer items-center gap-3 mt-3"><BsFiletypeCsv size={18} /> <p className="text-[14px] text-gray-500 hover:text-black font-medium">Download as csv file</p></div>
              <div onClick={() => setIsExportShow(false)} className="flex w-full hover:bg-gray-50 py-3 px-3 rounded-lg  cursor-pointer items-center gap-3 mt-3"><BsFiletypeXls size={18} /> <p className="text-[14px] text-gray-500 hover:text-black font-medium">Download as Excel file</p></div>
            </div>
          </div>
          )
         }
          </div>
          </div>
      </div>
      </div>

      <div className="mt-4">
          {isFormVisible && (
            <motion.div
              className="w-full border rounded-lg bg-white "
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full p-6">
                <CreateResource setIsFormVisible={setIsFormVisible} onSubmit={onSubmit}/>
              </div>
            </motion.div>
          )}
        </div>
      </div>
  );
};

export default Header;
