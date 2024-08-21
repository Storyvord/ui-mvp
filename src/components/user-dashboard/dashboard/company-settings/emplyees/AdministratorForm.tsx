import CustomForm from "@/components/crew/CustomForm";
import React, { useEffect, useState } from "react";
import { AdministratorFormData } from "./types";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { FormFieldConfig } from "@/types/crew";
import { useFormData } from "@/context/AdministratorContext";

const profileFormFields: FormFieldConfig<AdministratorFormData>[] = [
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
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Enter message",
  },
];

const adminFormDefaultValue: AdministratorFormData = {
  firstname: "",
  lastname: "",
  email: "",
  message: "",
};

const AdministratorForm = () => {
  const { toast } = useToast();
  const [isFormVisible, setFormVisible] = useState(true);
  const { setSubmittedData } = useFormData();

  const form = useForm({
    // resolver: zodResolver(profileFormValidationSchema),
    defaultValues: adminFormDefaultValue,
  });

  const onSubmit = (data: AdministratorFormData) => {
    localStorage.setItem("adminFormData", JSON.stringify(data));
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
        <h1 className="text-gray-500 md:text-xl text-md font-medium">Add Company Administrator</h1>
        <p className="text-gray-500 md:text-[14px] text-[13px] font-normal">
          To add a new administrator to your company account, enter the email address of the Yamdu
          user. Please note that a user can only be an administrator for one company.
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

export default AdministratorForm;
