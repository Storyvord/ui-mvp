"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import Select from "react-select";
import { Slider } from "@/components/ui/slider";
import {  projectFormInputType } from "@/types";
import { projectFormSchema } from "@/lib/validation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  content_type,
  crew_data,
  defaultFormValues,
  equipment_data,
} from "@/utils/constant";
import { Badge } from "@/components/ui/badge";
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";
import { useCreateProject, useLocationList } from "@/lib/react-query/queriesAndMutations";
import { redirect, useRouter } from "next/navigation";

interface OptionType {
  label: string;
  value: string;
}

const ForwardedAsyncPaginate = React.forwardRef<any, any>((props, ref) => (
  <AsyncPaginate {...props} forwardedRef={ref} />
));

ForwardedAsyncPaginate.displayName = "ForwardedAsyncPaginate";


const CreateProjectPage = () => {
  const form = useForm<projectFormInputType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: defaultFormValues,
  });

  const { mutateAsync: createProjectMutation } = useCreateProject()

  const locationArray = useFieldArray({
    control: form.control,
    name: "locationDetails",
  });
  // const [search, setSearch] = useState("")
  // const {data:locationData, isLoading}= useQuery({queryKey:["location", {search}], queryFn:{fetchLocation}})

  const {mutateAsync: LocationMutation} = useLocationList();

  const loadOptions: LoadOptions<OptionType, never, { page: number }> = async (
    search,
    loadedOptions,
    additional
  ) => {
    const { page } = additional ? additional : {page: 1}
    try {
      const data = await LocationMutation({search, page});
      return {
        options: data.data.map((location: any) => ({
            value: location.name,
            label: location.name,
        })),
        hasMore: Boolean(data.links?.next),  
      }
    }
    catch(error){
      console.error(error)
      return {
        options: [],
        hasMore: false,
      };
    }
  };
  const router = useRouter()
  // 2. Define a submit handler.
  async function onSubmit(formData: projectFormInputType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const project = await createProjectMutation(formData);
      console.log(project)
      router.push(`/project-details/${project.project_id}`)
    } catch (e) {
      form.setError("root", {type: 'manual', message:"Form submission failed"});
      console.error(e);
    }
  }

  const handleCrewRemove = (key: string) => {
    const newCrew = form.getValues("crew");
    delete newCrew[key];
    form.setValue("crew", { ...newCrew });
  };

  const handleEquipmentRemove = (key: string) => {
    const newEquipment = form.getValues("equipment");
    delete newEquipment[key];
    form.setValue("equipment", { ...newEquipment });
  };

  return (
    <div className="MuiBox-root css-8atqhb">
      <h1 className=" text-center md:mt-1 md:mb-6 sm:text-3xl text-xl font-semibold underline">
        Create a new Project
      </h1>
      <div className="w-full shadow-md space-y-8 mx-auto max-w-[650px] mt-4 lg:mt-6 lg:w-3/5 bg-white p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 justify-center flex flex-col"
          >
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
                      className="focus-visible:ring-0 focus-visible:ring-offset-0  focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    onChange={(selected) =>
                      field.onChange(selected ? selected.value : "")
                    }
                    onBlur={field.onBlur}
                    value={content_type.find(
                      (option) => option.value === field.value
                    )}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                    Budget:
                    <span className="text-black pl-[10px]">
                      ${form.getValues().budget / 1000}k
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      {...field}
                      min={5}
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
            <FormField
              control={form.control}
              name="crew"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                    Crew
                  </FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      options={crew_data}
                      placeholder="Select required crew members..."
                      onChange={(selected) =>
                        field.onChange(
                          selected
                            ? { ...field.value, [selected.value]: 1 }
                            : { ...field.value }
                        )
                      }
                      onBlur={field.onBlur}
                      value={crew_data.find((option) =>
                        Object.keys(field.value).includes(option.value)
                      )}
                      controlShouldRenderValue={false}
                    />
                  </FormControl>
                  {Object.keys(field.value).length > 0 && (
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {Object.keys(field.value).map((key) => (
                        <Badge
                          key={key}
                          className="rounded-md py-1 min-w-[200px] hover:bg-black"
                        >
                          <FormField
                            control={form.control}
                            name={`crew.${key}`}
                            render={({ field }) => (
                              <FormItem className="flex justify-between w-full items-center gap-2">
                                <FormLabel className="font-sans font-bold text-white">
                                  {key}
                                </FormLabel>
                                <FormControl>
                                  <div className="flex gap-2 items-center relative -top-1">
                                    <Input
                                      type="number"
                                      className="w-8 h-full p-1 text-black text-right"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                      }
                                    />
                                    <TrashIcon
                                      className="h-5 w-5 text-white cursor-pointer hover:text-red-500"
                                      onClick={() => handleCrewRemove(key)}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="equipment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                    Equipment
                  </FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      options={equipment_data}
                      placeholder="Select required equipments..."
                      onChange={(selected) =>
                        field.onChange(
                          selected
                            ? { ...field.value, [selected.value]: 1 }
                            : { ...field.value }
                        )
                      }
                      onBlur={field.onBlur}
                      value={equipment_data.find((option) =>
                        Object.keys(field.value).includes(option.value)
                      )}
                      controlShouldRenderValue={false}
                    />
                  </FormControl>

                  {Object.keys(field.value).length > 0 && (
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {Object.keys(field.value).map((key) => (
                        <Badge
                          key={key}
                          className="rounded-md py-1 min-w-[200px] hover:bg-black"
                        >
                          <FormField
                            control={form.control}
                            name={`equipment.${key}`}
                            render={({ field }) => (
                              <FormItem className="flex justify-between w-full items-center gap-2">
                                <FormLabel className="font-sans font-bold text-white">
                                  {key}
                                </FormLabel>
                                <FormControl>
                                  <div className="flex gap-2 items-center relative -top-1">
                                    <Input
                                      type="number"
                                      className="w-8 h-full p-1 text-black text-right"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                      }
                                    />
                                    <TrashIcon
                                      className="h-5 w-5 text-white cursor-pointer hover:text-red-500"
                                      onClick={() => handleEquipmentRemove(key)}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
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
                    Project Brief
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Enter Your Project description"
                      className="focus-visible:ring-0 focus-visible:ring-offset-0  focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additional_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">
                    Additional details
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="More details about the project..."
                      className="focus-visible:ring-0 focus-visible:ring-offset-0  focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <h1 className="sm:text-[18px] font-sans font-bold text-gray-600 text-center">
                Location Details
              </h1>
              {locationArray.fields.map((location, index) => (
                <div
                  key={location.id}
                  className="relative w-full h-fit p-5 border border-gray-300 rounded"
                >
                  <div className="absolute top-2 right-2">
                    <TrashIcon
                      className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-400"
                      onClick={() => locationArray.remove(index)}
                    />
                  </div>
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

{/* The location API limit has been reached for today, hence it has been changed to an input field */}

                            {/* <ForwardedAsyncPaginate
                              {...field}
                              debounceTimeout={1000}
                              loadOptions={loadOptions}
                              additional={{
                                page: 1,
                              }}
                              placeholder="Select Location"
                              // isLoading={isLoading}
                              onChange={(selected:{value:string, label:string})=>field.onChange(selected? selected.value: "")}
                              // options={options}
                              value={field.value ? { value: field.value, label: field.value } : null}
                            /> */}
                            <Input
                              placeholder="Enter Your Project Location"
                              {...field}
                              className="focus-visible:ring-0 focus-visible:ring-offset-0  focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
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
                              Tendative start date
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                className="block focus-visible:ring-0 focus-visible:ring-offset-0  focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
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
                              Tendative end date
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                className="block focus-visible:ring-0 focus-visible:ring-offset-0  focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
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
                        name={`locationDetails.${index}.mode` as const}
                        render={({ field }) => (
                          <FormItem className="">
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
                                        className="focus-visible:ring-0 focus-visible:ring-offset-0  focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Indoor
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-1 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        value="outdoor"
                                        className="focus-visible:ring-0 focus-visible:ring-offset-0  focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Outdoor
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-1 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        value="both"
                                        className="focus-visible:ring-0 focus-visible:ring-offset-0  focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Both
                                    </FormLabel>
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
                        name={
                          `locationDetails.${index}.filming_permits` as const
                        }
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-1 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="focus-visible:ring-0 focus-visible:ring-offset-0  focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="sm:text-[16px] font-sans font-bold text-gray-600">
                                Filming permits
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="border-green-500 font-bold text-green-500 hover:text-green-400 hover:bg-green-400/10 w-fit mx-auto"
                onClick={() =>
                  locationArray.append({
                    location: "",
                    start_date: "",
                    end_date: "",
                    filming_permits: false,
                    mode: "indoor",
                  })
                }
              >
                Add Another Location
              </Button>
            </div>
            <FormField
              control={form.control}
              name="ai_suggestions"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="focus-visible:ring-0 focus-visible:ring-offset-0  focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
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
            {
              form.formState.errors.root && (
                <FormMessage>
                  {form.formState.errors.root.message}
                </FormMessage>
              )
            }
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
