import React from "react";
import { Input } from "../ui/input";

interface SearchProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, onSearchTermChange }) => {
  return (
    <div className="mb-4 w-full mr-12 relative">
      {/* <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        placeholder="Search by name or price..."
        className="py-2 px-4 border border-gray-300 rounded-lg w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-300"
      />
      <svg
        className="w-5 h-5 absolute right-3 top-3 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35M16 9A7 7 0 1 1 9 2a7 7 0 0 1 7 7z"
        ></path>
      </svg> */}
      <Input
        placeholder="Search by name or price..."
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="py-2 px-4 border border-gray-300 rounded-lg w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-300"
      />
    </div>
  );
};

export default Search;