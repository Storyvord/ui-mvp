import React from "react";

const StyledInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      {...props}
      className="w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-blue-gray-700 disabled:border-0 transition-all placeholder-blue-gray-200 border border-blue-gray-500 focus:border-gray-900 px-3 py-2.5 rounded-md"
    />
  );
};

export default StyledInput;
