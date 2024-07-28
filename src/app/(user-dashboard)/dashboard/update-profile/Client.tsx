"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ClientProfileUpdateFormType } from "@/types";
import { ClientProfileUpdateSchema } from "@/lib/validation";
import { useGetClientProfile, useUpdateClientProfile } from "@/lib/react-query/queriesAndMutations";
import { useRouter } from "next/navigation";

const ProfileUpdateForm = () => {
  const router = useRouter();


  const { data: clientProfileData } = useGetClientProfile();
  const {mutateAsync: updateClientProfileData} = useUpdateClientProfile()


  const form = useForm({
    resolver: zodResolver(ClientProfileUpdateSchema),
    defaultValues: clientProfileData
  });

  const onSubmit = async (formData: ClientProfileUpdateFormType) => {

    try {
     const res =  await updateClientProfileData(formData)
     if(res) router.push("/dashboard/profile")
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <div className="w-full shadow-md space-y-8 mx-auto max-w-[650px] mt-4 lg:mt-6 lg:w-3/5 bg-white p-4">
      <h1 className="text-center md:mt-1 md:mb-6 sm:text-3xl text-xl font-semibold underline">
        Update Client Profile
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 justify-center flex flex-col">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter First Name"
                    {...field}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Last Name"
                    {...field}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="formalName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                  Formal Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Formal Name"
                    {...field}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                  Role
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Role"
                    {...field}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Location"
                    {...field}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="countryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                  Country Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Country Name"
                    {...field}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="locality"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                  Locality
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Locality"
                    {...field}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="personalWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                  Personal Website
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Personal Website"
                    {...field}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                    <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                  About
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Personal Website"
                    {...field}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-[300px] font-bold text-[16px] mx-auto"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <p className="flex items-center">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </p>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileUpdateForm;
