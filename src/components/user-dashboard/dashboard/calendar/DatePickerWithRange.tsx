"use client";

import React from "react";
import { addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  onSelectRange: (range: any | undefined) => void;
}

const DatePickerWithRange = ({ onSelectRange, className, ...props }: DatePickerWithRangeProps) => {
  const [date, setDate] = React.useState<any | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  // Handle date selection
  const handleSelect = (selectedRange: any | undefined) => {
    setDate(selectedRange);
    onSelectRange(selectedRange);
  };

  return (
    <div className={`bg-white rounded-lg ${className}`} {...props}>
      <Calendar
        // initialFocus
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={handleSelect}
        numberOfMonths={1}
      />
    </div>
  );
};

export default DatePickerWithRange;
