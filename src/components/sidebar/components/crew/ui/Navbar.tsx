import React from 'react';

const Navbar = () => {
  return (
    <div className="flex items-center px-4 py-2 bg-white border-b border-gray-200">
      <a href="#" className="text-black relative px-4 py-2 font-medium text-lg hover:text-black">
        Crew list
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black"></span>
      </a>
      <a href="#" className="text-gray-500 relative px-4 py-2 font-medium text-lg hover:text-black">
        Access rights
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transition-transform transform scale-x-0 hover:scale-x-100"></span>
      </a>
      <a href="#" className="text-gray-500 relative px-4 py-2 font-medium text-lg hover:text-black">
        External contacts
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transition-transform transform scale-x-0 hover:scale-x-100"></span>
      </a>
      <a href="#" className="text-gray-500 relative px-4 py-2 font-medium text-lg hover:text-black">
        Open positions
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transition-transform transform scale-x-0 hover:scale-x-100"></span>
      </a>
      <a href="#" className="text-gray-500 relative px-4 py-2 font-medium text-lg hover:text-black">
        Departments
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transition-transform transform scale-x-0 hover:scale-x-100"></span>
      </a>
      <a href="#" className="text-gray-500 relative px-4 py-2 font-medium text-lg hover:text-black">
        Units
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transition-transform transform scale-x-0 hover:scale-x-100"></span>
      </a>
    </div>
  );
};

export default Navbar;
