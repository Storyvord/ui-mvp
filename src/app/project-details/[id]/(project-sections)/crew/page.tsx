"use client";
import React, { useState } from 'react';
import Navbar from './ui/Navbar';
import CrewHires from './ui/CrewList';
import CrewSearch from './ui/CrewSearch';
import OpenPositions from './ui/OpenPositions';

const Main: React.FC = () => {
  const [activePage, setActivePage] = useState<number>(0);

  const renderPageContent = () => {
    switch (activePage) {
      case 0:
        return <CrewHires />;
      case 1:
        return <CrewSearch />;
      case 2:
        return <OpenPositions />;
      default:
        return <CrewHires />;
    }
  };

  return (
    <div >
      <Navbar setActivePage={setActivePage} />
      <div className="flex-grow p-4">
        {renderPageContent()}
      </div>
    </div>
  );
};

export default Main;
