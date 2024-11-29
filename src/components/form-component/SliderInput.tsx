import React from "react";
import { Slider } from "@/components/ui/slider";

type SliderInputProps = {
  value: number;
  field: any;
  minValue?: number;
  maxValue?: number;
};

const SliderInput: React.FC<SliderInputProps> = ({
  value,
  field,
  minValue = 0,
  maxValue = 100,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <Slider
        {...field}
        min={minValue}
        max={maxValue}
        step={1}
        value={[field.value / 1000]} // Slider value adjusted to thousands
        onValueChange={(value) => field.onChange(value[0] * 1000)} // Slider step adjusts by 1000
      />
      <span className="border rounded-lg px-2 py-1 font-poppins-semibold text-base text-gray-800">
        ${field.value / 1000}k
      </span>
    </div>
  );
};

export default SliderInput;
