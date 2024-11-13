import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type FilterProps = {
  onFilterChange: (key: string, value: string) => void;
};

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 px-3 my-4">
      <section className=" flex space-x-4">
        <Select onValueChange={(value) => onFilterChange("location", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Location</SelectLabel>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="On-Site">On-Site</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onFilterChange("type", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Job Type</SelectLabel>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
      {/* Search by Title */}
      <Input
        placeholder="Search by title..."
        onChange={(e) => onFilterChange("search", e.target.value)}
        className="flex-1"
      />
    </div>
  );
};

export default Filter;
