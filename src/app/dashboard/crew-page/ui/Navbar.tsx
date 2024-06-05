import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 w-[100%]">
    <div className="container mx-auto flex justify-center">
      <ul className="flex space-x-8">
        <li className="border-b-2 border-black">
          <a href="#" className="text-black ">Crew list</a>
        </li>
        <li>
          <a href="#" className="text-gray-500 hover:text-black">Access rights</a>
        </li>
        <li>
          <a href="#" className="text-gray-500 hover:text-black">External contacts</a>
        </li>
        <li>
          <a href="#" className="text-gray-500 hover:text-black">Open positions</a>
        </li>
        <li>
          <a href="#" className="text-gray-500 hover:text-black">Departments</a>
        </li>
      </ul>
    </div>
  </nav>
);
};

export default Navbar;
