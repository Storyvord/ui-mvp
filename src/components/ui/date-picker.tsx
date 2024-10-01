"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CalendarIcon from "@/assets/calendar.svg";
import Image from "next/image";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full mt-1 h-14 rounded-xl justify-between font-poppins font-normal text-[#333333] text-base border-[#66666659] hover:bg-[transparent]",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "PPP") : <span className="font-poppins font-normal text-[#666666] text-base">DD/MM/YYYY</span>}
          <Image src={CalendarIcon} alt="calendar-icon" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
