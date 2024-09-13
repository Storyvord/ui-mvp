"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import { FormFieldConfig } from "@/types";
import CustomForm from "@/components/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateProfileSchema } from "@/lib/validation";
import { useGetClientProfile, useUpdateClientProfile } from "@/lib/react-query/queriesAndMutations";
import { convertToBase64 } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

// Infer the TypeScript type from the Zod schema
export type ProfileType = z.infer<typeof updateProfileSchema>;

const formFields: FormFieldConfig<ProfileType>[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter First Name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter Last Name",
  },
  {
    name: "formalName",
    label: "Formal Name",
    type: "text",
    placeholder: "Enter Formal Name",
  },
  {
    name: "role",
    label: "Role",
    type: "text",
    placeholder: "Enter Role",
  },
  {
    name: "description",
    label: "About",
    type: "textarea", // Assuming this is a longer text, a textarea might be appropriate
    placeholder: "Enter Description",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter Address",
  },
  {
    name: "countryName",
    label: "Country Name",
    type: "text",
    placeholder: "Enter Country Name",
  },
  {
    name: "locality",
    label: "Locality",
    type: "text",
    placeholder: "Enter Locality",
  },
  {
    name: "personalWebsite",
    label: "Personal Website",
    type: "text",
    placeholder: "Enter Personal Website URL",
  },
  {
    name: "image",
    label: "Profile Image",
    type: "file", // Assuming image upload functionality
    placeholder: "Upload Profile Image",
  },
  {
    name: "phone_number",
    label: "Phone Number",
    type: "number",
    placeholder: "Enter Phone Number",
  },
];

const UpdateProfile = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { data: clientProfileData } = useGetClientProfile();
  const { mutateAsync: updateClientProfileData, isLoading, isError } = useUpdateClientProfile();
  const form = useForm<ProfileType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {},
  });
  useEffect(() => {
    form.reset({
      firstName: clientProfileData?.firstName,
      lastName: clientProfileData?.lastName,
      formalName: clientProfileData?.formalName,
      role: clientProfileData?.role,
      description: clientProfileData?.description,
      address: clientProfileData?.address,
      countryName: clientProfileData?.countryName,
      locality: clientProfileData?.locality,
      personalWebsite: clientProfileData?.personalWebsite,
      image: clientProfileData?.image,
      phone_number: clientProfileData?.phone_number,
    });
  }, [form, clientProfileData]);
  const onSubmit = async (data: ProfileType) => {
    const base64Image = await convertToBase64(data.image);
    const transformData = { ...data, image: base64Image };

    try {
      const res = await updateClientProfileData(transformData);
      if (res) {
        toast({ title: "Profile details successfully update" });
        router.push("/dashboard/profile");
      }
    } catch (error) {
      toast({ title: "Failed to update profile details", variant: "destructive" });
    }
  };
  return (
    <>
      <h1 className=" text-center text-xl mt-4 font-semibold text-gray-700">Update Profile</h1>
      <div className="w-full shadow-md space-y-8 mx-auto max-w-[650px] mt-4 lg:mt-6 lg:w-3/5 bg-white p-4">
        <CustomForm
          form={form}
          formFields={formFields}
          onSubmit={onSubmit}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </>
  );
};

export default UpdateProfile;
