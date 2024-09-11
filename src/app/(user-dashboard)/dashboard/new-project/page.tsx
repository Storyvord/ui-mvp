"use client";
import React, { useState, forwardRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { content_type, crew_data, defaultFormValues, equipment_data } from "@/constant/constant";
import { projectFormInputType } from "@/types";
import { projectFormSchema } from "@/lib/validation";
import { useLocationList } from "@/lib/react-query/queriesAndMutations";
import { useCreateProject } from "@/lib/react-query/queriesAndMutations/project";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { convertToBase64 } from "@/lib/utils";
import SelectInputWithQuantity from "@/components/SelectInputWithQuantity";

const ForwardedAsyncPaginate = forwardRef<any, any>((props, ref) => (
  <AsyncPaginate {...props} forwardedRef={ref} />
));
ForwardedAsyncPaginate.displayName = "ForwardedAsyncPaginate";
type OptionType = { value: string; label: string } | null;

const CreateProjectPage = () => {
  const form = useForm<projectFormInputType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: defaultFormValues,
  });
  const { mutateAsync: createProjectMutation } = useCreateProject();
  const { mutateAsync: LocationMutation } = useLocationList();
  const locationArray = useFieldArray({ control: form.control, name: "locationDetails" });
  const router = useRouter();


  //---------------this is for fetch location from api, (api is not working)----------
  // const loadOptions: LoadOptions<OptionType, never, { page: number }> = async (
  //   search,
  //   loadedOptions,
  //   additional
  // ) => {
  //   const { page } = additional ? additional : { page: 1 };
  //   try {
  //     const data = await LocationMutation({ search, page });
  //     return {
  //       options: data.data.map((location: any) => ({
  //         value: location.name,
  //         label: location.name,
  //       })),
  //       hasMore: Boolean(data.links?.next),
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     return { options: [], hasMore: false };
  //   }
  // };

  const onSubmit = async (formData: projectFormInputType) => {
    const { locationDetails, crew, equipment, projectName, description, budget, contentType } =
      formData;

    const base64 = await convertToBase64(formData.uploadedDocument);
    const transformedFormData = {
      location_details: locationDetails,
      selected_crew: crew,
      equipment: equipment,
      name: projectName,
      brief: description,
      additional_details: description,
      budget_currency: "$",
      budget_amount: budget,
      content_type: contentType,
      uploaded_document: base64,
    };
    console.log(transformedFormData);
    try {
      const project = await createProjectMutation(transformedFormData);
      if (project) router.push(`/project-details/${project.project_id}`);
    } catch (e) {
      form.setError("root", { type: "manual", message: "Form submission failed" });
      console.error(e);
    }
  };

  const renderLocationFields = () =>
    locationArray.fields.map((location, index) => (
      <div key={location.id} className="relative w-full h-fit p-5 border border-gray-300 rounded">
        <TrashIcon
          className="absolute top-2 right-2 h-6 w-6 text-red-500 cursor-pointer hover:text-red-400"
          onClick={() => locationArray.remove(index)}
        />
        <div className="space-y-4">
          <FormField
            control={form.control}
            name={`locationDetails.${index}.location` as const}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sm:text-[16px] font-sans font-bold text-gray-600">
                  Shoot Location
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Project Location"
                    {...field}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                  />
                </FormControl>
                <FormMessage className="break-all" />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap justify-between gap-2">
            <FormField
              control={form.control}
              name={`locationDetails.${index}.start_date` as const}
              render={({ field }) => (
                <FormItem className="min-w-[200px] w-[40%]">
                  <FormLabel className="sm:text-[16px] font-sans font-bold text-gray-600">
                    Tentative start date
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="block focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`locationDetails.${index}.end_date` as const}
              render={({ field }) => (
                <FormItem className="min-w-[200px] w-[40%]">
                  <FormLabel className="sm:text-[16px] font-sans font-bold text-gray-600">
                    Tentative end date
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="block focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-wrap justify-between items-center gap-5">
            <FormField
              control={form.control}
              name={`locationDetails.${index}.mode_of_shooting` as const}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-wrap items-center gap-1">
                    <FormLabel className="sm:text-[16px] font-sans font-bold text-gray-600">
                      Mode of shooting:
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-2 space-y-0 items-center"
                      >
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="indoor"
                              className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Indoor</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="outdoor"
                              className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Outdoor</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="both"
                              className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Both</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`locationDetails.${index}.permits` as const}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-1 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="sm:text-[16px] font-sans font-bold text-gray-600">
                      I need Filming Permit
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    ));

  return (
    <div className="MuiBox-root css-8atqhb px-4">
      <h1 className="text-center md:mt-1 md:mb-6 sm:text-3xl text-xl font-semibold underline">
        Create a new Project
      </h1>
      <div className="w-full shadow-md space-y-8 mx-auto max-w-[650px] mt-4 lg:mt-6 lg:w-3/5 bg-white p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 justify-center flex flex-col"
            encType="multipart/form-data"
          >
            {/* Project Name */}
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                    Project Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Project Title"
                      {...field}
                      className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content Type */}
            <FormField
              control={form.control}
              name="contentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                    Content Type
                  </FormLabel>
                  <Select
                    {...field}
                    options={content_type}
                    onChange={(selected) => field.onChange(selected ? selected.value : "")}
                    onBlur={field.onBlur}
                    value={content_type.find((option) => option.value === field.value)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Budget */}
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                    Total Project Budget:{" "}
                    <span className="text-black pl-[10px]">${form.getValues().budget / 1000}k</span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      {...field}
                      min={0.5}
                      max={200}
                      step={1}
                      value={[field.value / 1000]}
                      onValueChange={(value) => field.onChange(value[0] * 1000)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Crew */}
            <SelectInputWithQuantity fieldName="crew" data={crew_data} form={form} />

            {/*  Equipment */}
            <SelectInputWithQuantity fieldName="equipment" data={equipment_data} form={form} />

            {/* Project Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                    Project Brief (minimum 100 words)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Enter Your Project description"
                      className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Document Upload */}
            <FormField
              control={form.control}
              name="uploadedDocument"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                    Upload Document
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      placeholder="Enter Your Project Location"
                      {...field}
                      className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Details */}
            <div className="flex flex-col gap-2">
              <h1 className="sm:text-[18px] font-sans font-bold text-gray-600 text-center">
                Location Details
              </h1>
              {renderLocationFields()}
              <Button
                type="button"
                variant="outline"
                className="border-green-500 font-bold text-green-500 hover:text-green-400 hover:bg-green-400/10 w-fit mx-auto"
                onClick={() =>
                  locationArray.append({
                    location: "",
                    start_date: "",
                    end_date: "",
                    permits: false,
                    mode_of_shooting: "indoor",
                  })
                }
              >
                Add Another Location
              </Button>
            </div>

            {/* AI Suggestions */}
            <FormField
              control={form.control}
              name="ai_suggestions"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="sm:text-[16px] font-sans font-bold text-gray-600">
                      Allow AI to suggest crew & Equipment
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* Form Submission */}
            {form.formState.errors.root && (
              <FormMessage>{form.formState.errors.root.message}</FormMessage>
            )}
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
    </div>
  );
};

export default CreateProjectPage;
