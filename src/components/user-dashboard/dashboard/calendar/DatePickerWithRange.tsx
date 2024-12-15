"use client";

import React from "react";
import { addDays, startOfWeek, endOfWeek } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  onSelectRange: (range: any | undefined) => void;
}

const DatePickerWithRange = ({ onSelectRange, className, ...props }: DatePickerWithRangeProps) => {
  const [date, setDate] = React.useState<any | undefined>({
    from: startOfWeek(new Date(), { weekStartsOn: 0 }), // (Sunday)
    to: endOfWeek(new Date(), { weekStartsOn: 0 }), //(Saturday)
  });

  // Handle date selection
  const handleSelect = (selectedRange: any | undefined) => {
    setDate(selectedRange);
    onSelectRange(selectedRange);
  };

  return (
    <div className={`bg-white hidden xl:flex rounded-lg ${className}`} {...props}>
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
