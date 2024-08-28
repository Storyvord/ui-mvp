"use client";
import React, { useState } from 'react';
import Resources from './resources/Resources';
import Bookings from './bookings/Bookings';

const ResourcesPlanning = () => {
  const [activeTab, setActiveTab] = useState('Resources'); // Default active tab

  const handleTabClick = (tabName : string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="w-full">
      <div className="bg-white  px-6">
        <ul className="flex text-[22px] text-gray-400 gap-6">
          <li
            className={`py-3 cursor-pointer font-medium  ${
              activeTab === 'Resources' ? 'text-black border-b-2 border-black' : 'hover:text-black hover:border-b-2'
            }`}
            onClick={() => handleTabClick('Resources')}
          >
            Resources
          </li>
          <li
            className={`py-3 cursor-pointer font-smedium ${
              activeTab === 'Bookings' ? 'text-black border-b-2 border-black' : 'hover:text-black hover:border-b-2'
            }`}
            onClick={() => handleTabClick('Bookings')}
          >
            Bookings
          </li>
        </ul>
      </div>

      <div>
        {
          activeTab === "Resources" ? ( <Resources /> ) : ( <Bookings /> )
        }
      </div>
    </div>
  );
};

export default ResourcesPlanning;
