import { FC } from "react";

interface FilterProps {
  filterTerm: string;
  setFilterTerm: (term: string) => void;
}

const Filter: FC<FilterProps> = ({ filterTerm, setFilterTerm }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={filterTerm}
        onChange={(e) => setFilterTerm(e.target.value)}
        placeholder="Filter by role or expertise..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Filter;
