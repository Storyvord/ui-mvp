import React, {useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { FormFieldConfig } from "@/types/crew";
import CustomForm from "@/components/CustomForm";
import { IoClose } from "react-icons/io5";
import { CreateResourceType } from "../type";

type HeaderProps = {
    onSubmit: (data: CreateResourceType) => void; 
    setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>; 
}

const createResourceFormFields: FormFieldConfig<CreateResourceType>[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter your description",
  },
  {
    name: "category",
    label: "Category",
    type: "text",
    placeholder: "Enter your email",
  },
  {
    name: "icon",
    label: "Select Icon",
    type: "text",
    placeholder: "Enter your position",
  },
];

const resourcesFormDefaultValue: CreateResourceType = {
  id: Date.now(),
  name: "",
  description: "",
  category: "",
  icon: null
};

const CreateResource: React.FC<HeaderProps> = ({setIsFormVisible, onSubmit}) => {
  const form = useForm({
    // resolver: zodResolver(profileFormValidationSchema),
    defaultValues: resourcesFormDefaultValue,
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
            formFields={createResourceFormFields}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isError={isError}
          />
      </div>
    </div>
  );
};

export default CreateResource;
