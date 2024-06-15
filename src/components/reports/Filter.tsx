import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Replace with the correct path to your Select component

interface FilterProps {
  roles: string[];
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  roles,
  selectedRole,
  onRoleChange,
}) => {
  return (
    <div className="mb-4">
      <Select onValueChange={onRoleChange} value={selectedRole || "all"}>
        <SelectTrigger className="w-full sm:w-44 py-2 px-4 border border-gray-300 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-300">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Roles</SelectLabel>
            <SelectItem value="all">All Roles</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
