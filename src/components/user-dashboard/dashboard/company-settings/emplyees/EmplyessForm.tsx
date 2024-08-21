import React, { useEffect, useState } from "react";
import { EmplyeesFormData } from "./types";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { FormFieldConfig } from "@/types/crew";
import { useFormData } from "@/context/EmplyeesContext";
import CustomForm from "@/components/CustomForm";

const profileFormFields: FormFieldConfig<EmplyeesFormData>[] = [
  {
    name: "firstname",
    label: "FirstName",
    type: "text",
    placeholder: "Enter your first name",
  },
  {
    name: "lastname",
    label: "LastName",
    type: "text",
    placeholder: "Enter your last name",
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter your email",
  },
  {
    name: "positions",
    label: "Positions",
    type: "text",
    placeholder: "Enter your position",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Enter message",
  },
];

const emplyeesFormDefaultValue: EmplyeesFormData = {
  firstname: "",
  lastname: "",
  email: "",
  positions: "",
  message: "",
};

const EmplyeesForm = () => {
  const { toast } = useToast();
  const [isFormVisible, setFormVisible] = useState(true);
  const { setSubmittedData } = useFormData();

  const form = useForm({
    // resolver: zodResolver(profileFormValidationSchema),
    defaultValues: emplyeesFormDefaultValue,
  });

  const onSubmit = (data: EmplyeesFormData) => {
    localStorage.setItem("emplyeesFormData", JSON.stringify(data));
    setSubmittedData(data);
    toast({
      title: "Form submitted",
      description: "Your form data has been submitted successfully.",
    });
    setFormVisible(false);
  };

  const isLoading = false;
  const isError = false;

  return (
    <div>
      <div className="pb-4 flex flex-col gap-2">
        <h1 className="text-gray-500 md:text-xl text-md font-medium">
          Add Employee / Staff member
        </h1>
        <p className="text-gray-500 md:text-[14px] text-[13px] font-normal">
          You can add users as employees / staff members to your company account. Employees / staff
          members will be added automatically to your projects with the selected positions. Input
          the first name, last name and the email address of the user and select the positions of
          the employee / staff member.
        </p>
      </div>
      <div>
        {isFormVisible && (
          <CustomForm
            form={form}
            formFields={profileFormFields}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isError={isError}
          />
        )}
      </div>
    </div>
  );
};

export default EmplyeesForm;
