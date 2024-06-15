"use client";
import React, { useState } from 'react';

interface NavbarProps {
  setActivePage: (index: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setActivePage }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    setActivePage(index);
  };

  return (
    <nav className="bg-white shadow-md py-2 w-[100%] flex justify-start">
      <div className="container flex m-0">
        <ul className="flex">
          {['Crew hires', 'Crew Search', 'Open positions'].map((item, index) => (
            <li
              key={index}
              className={`w-max text-2xl text-center mx-0 sm:mx-4 md:mr-2 ${
                activeIndex === index ? 'text-black border-b-2 border-black' : 'text-gray-400'
              } hover:border-b-2 hover:border-black`}
              onClick={() => handleClick(index)}
            >
              <a
                href="#"
                className={`hover:text-black font-semibold ${
                  activeIndex === index ? 'text-black' : 'text-gray-400'
                }`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
