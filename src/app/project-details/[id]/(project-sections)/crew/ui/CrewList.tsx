"use client";

import React, { useState } from 'react';
import Image from 'next/image';

import image1 from './image/collapse.png';
import image2 from './image/expand-arrows.png';
import eye1 from './image/eye.png';
import eye2 from './image/eye2.png';
import exp from './image/export.png';
import edit from './image/edit.png';
import padlock from './image/padlock.png';
import plus from './image/plus.png'

import up from './image/upload.png';
import down from './image/down-arrow.png';
import cloud from  './image/download.png'

const CrewList = () => {
  const [isImageOne, setIsImageOne] = useState(true);
  const [isCollapse, setIsCollapse] = useState("Collapse All");
  const [isImageTwo, setIsImageTwo] = useState(true);
  const [show, setShow] = useState("Show hidden elements");
  const [accordionItems, setAccordionItems] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isExport, setIsExport] = useState(false);



  const handleClick1 = () => {
    setIsImageTwo(!isImageTwo);
    setShow(isImageTwo ? "Hide hidden elements" : "Show hidden elements");
  };

  const handleClick = () => {
    setIsImageOne(!isImageOne);
    setIsCollapse(isImageOne ? "Expand All" : "Collapse All");
  };

  const addNewItem = (item: string) => {
    setAccordionItems([...accordionItems, item]);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const toggleVisibility1 = () => {
    setIsExport(!isExport);
  };

  const handleClick2 = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <section className="border-[1.1px] border-gray-200 bg-white h-auto flex flex-col items-center md:flex md:flex-col xl:flex-row justify-between">
        <div className="flex relative md:-left-[15vw] lg:-left-[12vw] xl:left-0">
          <div className="relative max-w-sm">
            <input
              className="w-full py-2 px-4 border my-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-600 mx-1"
              type="search"
              placeholder="Search"
            />
            <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 rounded-r-md focus:outline-none focus:border-gray-500">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z"
                />
              </svg>
            </button>
          </div>

          {/* collapse */}
          <div className="flex items-center mx-2">
            <Image src={isImageOne ? image1 : image2} alt="Collapse Icon" className="h-5 w-5 cursor-pointer mx-1" onClick={handleClick} />
            <button className="text-blue-500" onClick={handleClick}>{isCollapse}</button>
          </div>

          {/* hide and show */}
          <div className="flex items-center mx-0">
            <Image src={isImageTwo ? eye1 : eye2} alt="Hide/Show Icon" className="h-5 w-5 cursor-pointer mx-1" />
            <button className="text-blue-500" onClick={handleClick1}>{show}</button>
          </div>
        </div>

        <div className=" h-[40px] w-full md:w-[350px] relative md:left-[29%] xl:left-0 flex items-center justify-end">
          {/* export */}
          <div className="flex"onClick={toggleVisibility1} >
            <Image src={exp} alt="Export Icon" className="h-6 w-6 cursor-pointer mx-1" />
            <button className="text-blue-500">Export</button>
          </div>

          {/* add */}
          <button onClick={toggleVisibility} className="bg-blue-500 w-16 h-8 text-white flex items-center justify-center mx-2 rounded-sm"> + Add</button>

          {/* edit */}
          <div className="border-[1.1px] border-gray-300 w-20 h-8 flex items-center justify-center mx-1 rounded-sm">
            <Image src={edit} alt="Edit Icon" className="h-5 w-5 cursor-pointer mr-1" />
            <button className="text-blue-500">Edit</button>
          </div>

          {/* lock */}
          <div className="border-[1.1px] border-gray-300 w-24 h-8 flex items-center justify-center mx-1 rounded-sm">
            <Image src={padlock} alt="Padlock Icon" className="h-5 w-5 cursor-pointer mr-1" />
            <div className="h-6 w-5 mx-[0.5px] border-[1.1px] border-gray-300"></div>
            <div className="h-6 w-5 mx-[0.5px] border-[1.1px] border-gray-300"></div>
            <div className="h-6 w-5 mx-[0.5px] border-[1.1px] border-gray-300"></div>
            <div className="mx-1">1</div>
          </div>
        </div>
      </section>









    
      <div className={`${isExport ? 'flex' : 'hidden'} bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4  w-[25%] left-[65%] absolute z-50 flex-col justify-center item` }>
        <p className='text-[12px] mx-[12px]'>PDF- EXPORTS</p>
      <div className=" flex  items-center text-gray-400"> <img src="https://cdn-icons-png.flaticon.com/128/482/482216.png" alt="" className='w-[20px] h-[20px] mx-3 my-2 ' />Crew list</div>
      <div className=" flex  items-center text-gray-400"> <img src="https://cdn-icons-png.flaticon.com/128/482/482216.png" alt="" className='w-[20px] h-[20px] mx-3 my-2 ' />Crew list for catering</div>
      <div className=" flex  items-center text-gray-400"> <img src="https://cdn-icons-png.flaticon.com/128/482/482216.png" alt="" className='w-[20px] h-[20px] mx-3 my-2 ' />Crew list for catering without image</div>
      <br />
      <p className='text-[12px] mx-[12px]'>OTHER EXPORTS</p>
      <div className=" flex  items-center text-gray-400"> <img src="https://cdn-icons-png.flaticon.com/128/13056/13056328.png" alt="" className='w-[20px] h-[20px] mx-3 my-2 ' />Download as csv file</div>
      <div className=" flex  items-center text-gray-400"> <img src="https://cdn-icons-png.flaticon.com/128/3997/3997617.png" alt="" className='w-[20px] h-[20px] mx-3 my-2 ' />Download as Excel file</div>
      <div className=" flex  items-center text-gray-400"> <img src="https://cdn-icons-png.flaticon.com/128/8625/8625838.png" alt="" className='w-[20px] h-[20px] mx-3 my-2 ' />Add to my address book</div>




      </div>






      <div className={`${isVisible ? 'flex' : 'hidden'} bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4  w-[25%] left-[65%] absolute z-50 flex-col justify-center item` }>
             <div className=" flex  items-center text-gray-400"> <Image src={plus }alt="" className='w-[12px] h-[12px] mx-3 my-2 ' />Invite user ?</div>
             <div className=" flex  items-center text-gray-400"> <Image src={plus }alt="" className='w-[12px] h-[12px] mx-3 my-2 ' />Add external content ?</div>
             <div className=" flex  items-center text-gray-400"> <Image src={plus }alt="" className='w-[12px] h-[12px] mx-3 my-2 ' />Add open position ?</div>
             <div className=" flex  items-center text-gray-400"> <Image src={plus }alt="" className='w-[12px] h-[12px] mx-3 my-2 ' />Add department</div>
                <br />
             <div className=" flex  items-center text-gray-400"> <Image src={cloud }alt="" className='w-[20px] h-[20px] mx-2 my-2 ' />Invite user from company database</div>
             <div className=" flex  items-center text-gray-400"> <Image src={cloud }alt="" className='w-[20px] h-[20px] mx-2 my-2 ' />Import external contact</div>


      </div>




     {/* accordion */}
      {/* control */}
      <div className="border-[1.1px] border-gray-200 bg-white h-12 flex items-center z-10 relative top-[20px] rounded-sm">
      <button onClick={handleClick2}>
          <Image src={isClicked ? down : up} alt="Toggle Icon" className="w-[20px]  relative left-[10px] z-10" />
        </button>
        <span className='relative left-[20px] text-[20px] font-semibold'>Title</span>
       
      </div>

      {/* main */}
      <div className={`border-[1.1px] border-gray-300 transition-height duration-300 bg-white ${isClicked ? 'h-auto' : 'h-[50px]'} relative -top-[29px] ${isClicked ? 'flex' : 'hidden'} rounded-sm`}>
       
        <div className="w-[60%] flex flex-col items-center justify-center">
          main content
         

        </div>
      </div>
    </>
  );
};

export default CrewList;
