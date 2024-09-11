import React, { memo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import Select from "react-select";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

type OptionType = { value: string; label: string } | null;

interface SelectableFieldsProps {
  fieldName: string;
  data: { value: string; label: string }[];
  form: UseFormReturn<any>;
}

const SelectInputWithQuantity: React.FC<SelectableFieldsProps> = ({ fieldName, data, form }) => {
  const [customNames, setCustomNames] = useState<{ [key: number]: string }>({});

  const handleRemove = (index: number) => {
    const currentValue = form.getValues(fieldName) || [];
    currentValue.splice(index, 1); // Remove item at the specified index
    form.setValue(fieldName, [...currentValue]);

    // Remove custom name entry if it exists
    const updatedCustomNames = { ...customNames };
    delete updatedCustomNames[index];
    setCustomNames(updatedCustomNames);
  };

  const renderSelectedFields = () => {
    const currentValues = form.getValues(fieldName) || [];
    return currentValues.map((item: { title: string; quantity: number }, index: number) => {
      const isCustomTitle = !data.some((crew) => crew.value === item.title);

      return (
        <Badge key={index} className="rounded-md py-1 bg-slate-900 hover:bg-slate-900">
          <FormField
            control={form.control}
            name={`${fieldName}.${index}.quantity`}
            render={({ field }) => (
              <FormItem className="flex justify-between w-full items-center gap-2">
                {isCustomTitle ? (
                  <input
                    placeholder="Enter name"
                    className="font-sans font-bold w-full bg-slate-900 border-b-2 border-slate-700 focus:outline-none focus:border-slate-500 p-2 text-[0.9rem] text-white"
                    value={customNames[index] || item.title}
                    onChange={(e) => {
                      const newName = e.target.value;
                      setCustomNames({ ...customNames, [index]: newName });
                      form.setValue(`${fieldName}.${index}.title`, newName);
                    }}
                  />
                ) : (
                  <FormLabel className="font-sans font-bold text-white">{item.title}</FormLabel>
                )}
                <FormControl>
                  <div className="flex gap-2 items-center relative -top-1">
                    <button
                      type="button"
                      className="p-1 bg-red-800 text-white rounded hover:bg-red-700"
                      onClick={() => {
                        const newQuantity = item.quantity - 1;
                        if (newQuantity <= 0) {
                          handleRemove(index);
                        } else {
                          form.setValue(`${fieldName}.${index}.quantity`, newQuantity);
                        }
                      }}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <p className=" text-[1rem]">{item.quantity}</p>
                    <button
                      type="button"
                      className="p-1 bg-green-800 text-white rounded hover:bg-green-700"
                      onClick={() =>
                        form.setValue(`${fieldName}.${index}.quantity`, item.quantity + 1)
                      }
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Badge>
      );
    });
  };

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select
              {...field}
              options={[...data, { value: "Others", label: "Others" }]}
              placeholder={`Select required ${fieldName}...`}
              onChange={(selected) => {
                const selectedOption = selected as OptionType;
                const currentValue = field.value || [];

                if (selectedOption && typeof selectedOption.value === "string") {
                  // Handle adding multiple "Others" entries by making each entry unique
                  const newEntry = {
                    title:
                      selectedOption.value === "Others"
                        ? `Others-${currentValue.length}`
                        : selectedOption.value,
                    quantity: 1,
                  };

                  form.setValue(fieldName, [...currentValue, newEntry]);
                }
              }}
              onBlur={field.onBlur}
              value={null} // Ensure no selected value shows up in the select input
              controlShouldRenderValue={false}
            />
          </FormControl>
          {Array.isArray(field.value) && field.value.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">{renderSelectedFields()}</div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default memo(SelectInputWithQuantity);
