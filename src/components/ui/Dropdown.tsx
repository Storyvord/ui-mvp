import React from "react";

interface DropdownProps {
  data: string[];
  onSelectCountry: (country: string) => void;
  className?: string; // Fix typo in prop name
  placeholder:string
}

const Dropdown: React.FC<DropdownProps> = ({
  data,
  onSelectCountry,
  placeholder,
  className = "", // Default to empty string if not provided
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    onSelectCountry(selectedCountry);
  };

  return (
    <select
      onChange={handleChange}
      className={`border border-gray-300 rounded-md w-full py-2 focus:outline-none focus:border-black ${className}`}
    >
      <option value="">{`${placeholder}`}</option>
      {data.map((data, index) => (
        <option key={index} value={data}>
          {data}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
