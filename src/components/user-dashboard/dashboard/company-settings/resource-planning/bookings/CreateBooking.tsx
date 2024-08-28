import React, {useState } from "react";
import { useForm } from "react-hook-form";
import { FormFieldConfig } from "@/types/crew";
import CustomForm from "@/components/CustomForm";
import { IoClose } from "react-icons/io5";
import { CreateBookingType, CreateResourceType } from "../type";

type HeaderProps = {
  onSubmit: (data: CreateBookingType) => void; 
    setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>; 
}

const createBookingFormFields: FormFieldConfig<CreateBookingType>[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
  },
  {
    name: "company",
    label: "Project or company",
    type: "text",
    placeholder: "storyvord(Company)",
  },
  {
    name: "start",
    label: "Start",
    type: "date",
    placeholder: "27-08-2024",
  },
  {
    name: "end",
    label: "End",
    type: "date",
    placeholder: "27-08-2024",
  },
  {
    name: "time",
    label: "Time",
    type: "datetime-local",
    placeholder: "Add time",
  },
  {
    name: "note",
    label: "Note",
    type: "textarea",
    placeholder: "Add note",
  },
];

const bookingFormDefaultValue: CreateBookingType = {
  id: Date.now(),
  name: "",
  company:"",
  start: "",
  end: "",
  time:"",
  note:"",
};

const CreateBooking: React.FC<HeaderProps> = ({setIsFormVisible, onSubmit}) => {
  const form = useForm({
    // resolver: zodResolver(profileFormValidationSchema),
    defaultValues: bookingFormDefaultValue,
  });


  const isLoading = false;
  const isError = false;

  return (
    <div>
      <div className="pb-4 flex items-center justify-between gap-2">
        <h1 className="text-gray-500 md:text-xl text-md font-medium">
        Create resource category
        </h1>
            <div onClick={() => setIsFormVisible(false) } className="hover:bg-gray-100 p-[6px] text-gray-500 hover:text-black rounded-md cursor-pointer"><IoClose size={20} /></div>
      </div>
      <div>
          <CustomForm
            form={form}
            formFields={createBookingFormFields}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isError={isError}
          />
      </div>
    </div>
  );
};

export default CreateBooking;
