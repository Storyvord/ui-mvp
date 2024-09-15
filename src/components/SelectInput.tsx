import React from "react";
import Select from "react-select";
import { Control, Controller } from "react-hook-form";
import { FieldValues, Path } from "react-hook-form";

type MultiSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  options: { value: string; label: string }[];
  isMulti?: boolean; // Add isMulti prop
  placeholder?: string;
};

const SelectInput = <T extends FieldValues>({
  control,
  name,
  options,
  isMulti = false,
  placeholder,
}: MultiSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          options={options}
          isMulti={isMulti} // Use isMulti prop
          onChange={(selectedOption) => {
            field.onChange(
              isMulti
                ? selectedOption
                  ? (selectedOption as any[]).map((option) => option.value)
                  : []
                : (selectedOption as any)?.value || ""
            );
          }}
          value={
            isMulti
              ? options.filter((option) =>
                  (field.value as string[]).includes(option.value)
                )
              : options.find((option) => option.value === field.value) || null
          }
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default SelectInput;
