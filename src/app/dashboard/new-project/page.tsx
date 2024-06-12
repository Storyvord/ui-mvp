"use client"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import React, { useState } from "react";
import CustomSelect from "@/components/create_project_form/CustomSelect";
import { useForm , useFieldArray} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { projectFormSchema, projectFormInputType } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { content_type, crew_data } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import {z, ZodObject} from "zod"

const CreateProjectPage = () => {
  const form = useForm<projectFormInputType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues:{
      projectName: "",
      contentType: "",
      otherContent: "",
      budget: 0,
      crew:[],
      description: "",
      additional_details: "",
      locationDetails: [{
        location: "",
        start_date: "",
        end_date: "",
        filming_permits: false,
      }],
      ai_suggestions: false,
    }
  })

  const locationArray = useFieldArray({
    control: form.control,
    name: "locationDetails"
  })

  const crewArray = useFieldArray({
    control: form.control,
    name: "crew"
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: projectFormInputType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    form.reset
  }

    
  
  const selectedOption = form.watch('contentType');
  const [crewInputOpen, setCrewInputOpen]= useState<boolean>(false);
  const [crewInput, setCrewInput]= useState<string>("");
  const handleCrewSelect = (value: string) =>{
    if(value==="Other"){
        setCrewInputOpen(true);
    }
    else{
      setCrewInputOpen(false);
      crewArray.append({
        type: value,
        count: 1,
      })
    }
  }

  return (
    <div className="MuiBox-root css-8atqhb">
      <h1 className=" text-center md:mt-1 md:mb-6 sm:text-3xl text-xl font-semibold underline">
        Create a new Project
      </h1>
      <div className="w-full shadow-md space-y-8 mx-auto max-w-[650px] mt-4 lg:mt-6 lg:w-3/5 bg-white p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 justify-center flex flex-col">
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Project Title" {...field}/>
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
                <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">Content Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {content_type.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {
                  selectedOption === "Other" ? (
                    <FormField
                      control={form.control}
                      name="otherContent"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Enter Your Content Type" {...field} className="mt-[20px]"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                    )}
          />
                  ): null
            }
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">Budget:  
                  <span className="text-black pl-[10px]">
                    ${form.getValues().budget}k
                  </span>
                </FormLabel>
                <FormControl>
                  <Slider
                    {...field}
                    min={0}
                    max={100}
                    step={1}
                    value={[field.value]}
                    onValueChange={value => field.onChange(value[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Label className="sm:text-[18px] font-sans font-bold text-gray-600">Crew</Label>
            <Select onValueChange={handleCrewSelect} defaultValue={""}>
                  <SelectTrigger>
                      <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {crew_data.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {
                  crewInputOpen ? (
                    <div className="relative">
                        <Input placeholder="Enter Crew Type" value={crewInput} onChange={(e)=>setCrewInput(e.target.value)}  className="mt-[10px]"/>
                        <Button type="button" variant="outline" size="icon" className="absolute right-1 top-1 border-none h-8 w-8"
                          onClick={
                            ()=>{
                              crewArray.append({
                                type: crewInput,
                                count: 1,
                              })
                              setCrewInput("");
                            }
                          }
                          disabled={crewInput? false:true}
                        >
                          <PlusIcon className="h-5 w-5 " />
                        </Button>
                    </div>
                    
                  ): null
                }
                {crewArray.fields.length>0 && (
                  <div className="mt-2 flex gap-2 flex-wrap">
                      {crewArray.fields.map((crew, index)=>(
                        <Badge key={crew.id} className="flex justify-between rounded-md py-2 min-w-[200px]">
                          <FormField
                            control={form.control}
                            name={`crew.${index}.count` as const}
                            render={({ field }) => (
                              <FormItem className="w-full flex justify-between items-center gap-2">
                                <FormLabel className="sm:text-[16px] font-sans font-bold text-white">{crew.type}</FormLabel>
                                <FormControl>
                                  <Input type="number" className="w-10 h-full p-2 text-black text-right"  {...field}/>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                        </Badge>
                      ))}
                  </div>
                )}
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">Project Brief</FormLabel>
                <FormControl>
                  <Textarea rows={4} placeholder="Enter Your Project description" className="resize-none" {...field}/>
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
                <FormLabel className="sm:text-[18px] font-sans font-bold text-gray-600">Additional details</FormLabel>
                <FormControl>
                  <Textarea rows={4} placeholder="More details about the project..." className="resize-none" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <h1 className="sm:text-[18px] font-sans font-bold text-gray-600 text-center">Location Details</h1>
            {
              locationArray.fields.map((location, index)=> (
                <div key={location.id} className="relative w-full h-fit p-5 border border-gray-300 rounded">
                    <div className="absolute top-2 right-2">
                      <TrashIcon className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-400" onClick={()=>locationArray.remove(index)}/>
                    </div>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`locationDetails.${index}.location` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="sm:text-[16px] font-sans font-bold text-gray-600">Shoot Location</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter Location" {...field}/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex flex-wrap justify-between gap-2">
                        <FormField
                          control={form.control}
                          name={`locationDetails.${index}.start_date` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="sm:text-[16px] font-sans font-bold text-gray-600">Tendative start date</FormLabel>
                              <FormControl>
                                <Input type="date"  {...field} className="w-fit"/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`locationDetails.${index}.end_date` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="sm:text-[16px] font-sans font-bold text-gray-600">Tendative end date</FormLabel>
                              <FormControl>
                                <Input type="date"  {...field} className="w-fit"/>
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
                            <FormItem className="flex flex-wrap items-center gap-1">
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
                                      <RadioGroupItem value="indoor" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Indoor
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-1 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="outdoor" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Outdoor
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-1 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="both" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Both</FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                            control={form.control}
                            name={`locationDetails.${index}.filming_permits` as const}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-1 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
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
              ))
            }
            <Button type="button" 
              variant="outline"
              className="border-green-500 font-bold text-green-500 hover:text-green-400 hover:bg-green-400/10 w-fit mx-auto"
              onClick={()=>locationArray.append({
                location: "",
                start_date: "",
                end_date: "",
                filming_permits: false,
                mode: "indoor"
              })}>
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
          <Button type="submit" className="w-[300px] font-bold text-[16px] mx-auto">Submit</Button>
        </form>
      </Form>
        </div>
    </div>
  );
};

export default CreateProjectPage;
