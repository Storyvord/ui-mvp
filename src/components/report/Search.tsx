import React from "react";
import { Input } from "../ui/input";

interface SearchProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, onSearchTermChange }) => {
  return (
    <div className="mb-4 w-full  relative">
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
