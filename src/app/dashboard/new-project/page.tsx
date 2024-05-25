import { DatePicker } from "@/components/create_project_form/DatePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import CustomSelect from "@/components/create_project_form/CustomSelect";

const page = () => {
  const content_type = [
    "Events",
    "People Stories",
    "Animation",
    "Company News",
    "Company Stories",
    "Case Studies",
    "Interviews",
    "Tutorial",
    "Product Demo",
    "Help & How To",
    "Virtual Events",
    "Advertising",
    "Live Stream",
    "Speaker",
    "Recruitment",
  ];
  const equipment_data = [
    "Camera",
    "Tripod",
    "Lighting Kit",
    "Microphone",
    "Boom Pole",
    "Audio Recorder",
    "Drone",
    "Gimbal Stabilizer",
    "Reflectors",
    "Clapperboard",
    "Lens Kit",
    "Monitor",
    "Video Switcher",
  ];
  const crew_data = [
    "Director",
    "Producer",
    "Screenwriter",
    "Director of Photography(Cinemantography)",
    "Production Designer",
    "Art Designer",
    "Sound Designer",
    "Editor",
    "Costume Designer",
    "Makeup Artist",
    "Special Effect Supervisor",
    "Composer",
    "Casting Designer",
  ];
  const mode_of_shooting = ["Indoor", "Outdoor", "Mix(Indoor & Outdoor)"];
  return (
    <div className="MuiBox-root css-8atqhb">
      <h1 className=" text-center md:mt-1 md:mb-6 md:text-3xl text-xl font-semibold underline">
        Create a new Project
      </h1>
      <div className="w-full shadow-md space-y-8 mx-auto max-w-[650px] mt-4 lg:mt-6 lg:w-3/5 bg-white p-4">
        <div>
          <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 -mb-3 font-medium">
            Project Name
          </h5>
          <div className="relative w-full min-w-[200px] h-12 my-[2rem]">
            <Input type="text" placeholder="Enter Your Project Tittle" />
          </div>
        </div>
        <div className=" space-y-[8px]">
          <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 -mb-1 font-medium">
            Select Contect Type
          </h5>
          <div>
            <CustomSelect
              options={crew_data}
              className="w-full"
              placeholder="Select..."
            />
          </div>
          <h1 className=" text-center font-semibold text-gray-600 text-xl">
            or
          </h1>
          <div className="relative w-full min-w-[200px] h-12 my-[2rem]">
            <Input type="text" placeholder="Enter Your required content type" />
          </div>
        </div>
        <div>
          <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 -mb-3 font-medium">
            Budget ($)
          </h5>
          <div className="relative w-full min-w-[200px] h-12 my-[2rem]">
            <Input type="text" placeholder="Enter Your required content type" />
          </div>
        </div>
        <div className="space-y-[8px]">
          <div>
            <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 -mb-3 font-medium">
              Budget ($)
            </h5>
            <div className="relative w-full min-w-[200px] h-12 my-[2rem]">
              <Input type="text" placeholder="Enter Your Budget" />
            </div>
          </div>

          <div className="space-y-[8px]">
            <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 -mb-3 font-medium">
              Shoot Location
            </h5>
            <div className="relative w-full min-w-[200px] h-12 my-[2rem]">
              <Input type="text" placeholder="Enter Your Shoot Location" />
            </div>
          </div>

          <div className="px-4 md:flex justify-between items-center space-y-4">
            <div>
              <Label
                htmlFor="text"
                className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 font-medium"
              >
                Tentative Start Date
              </Label>
              <DatePicker />
            </div>
            <div>
              <Label
                htmlFor="text"
                className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 font-medium"
              >
                Tentative End Date
              </Label>
              <DatePicker />
            </div>
          </div>

          <div className=" px-4  flex items-center gap-6">
            <Label
              htmlFor="text"
              className="mb-1 font-medium text-blue-gray-900"
            >
              Filming permits:
            </Label>
            <Checkbox className=" w-4 h-4" />
          </div>
          <div className="space-y-[8px] flex flex-row space-x-5">
            <div>
              <Label className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 mt-4 font-medium">
                Mode of Shooting:
              </Label>
            </div>
            <div>
              <CustomSelect
                options={mode_of_shooting}
                className="w-[120px]"
                placeholder="Select..."
              />
            </div>
          </div>
          <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none mx-4">
            ADD
          </button>
          <div className="px-4 max-h-[300px] overflow-y-scroll"></div>
        </div>

        <div className=" space-y-[8px]">
          <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 -mb-1 font-medium">
            Select Crew
          </h5>
          <div>
            <CustomSelect
              options={crew_data}
              className="w-full"
              placeholder="Select..."
            />
          </div>
          <h1 className=" text-center font-semibold text-gray-600 text-xl">
            or
          </h1>
          <div className="relative w-full min-w-[200px] h-12 my-[2rem]">
            <Input type="text" placeholder="Enter Your required content type" />
          </div>
        </div>

        <div className=" space-y-[8px]">
          <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 -mb-1 font-medium">
            Equipment
          </h5>
          <div>
            <CustomSelect
              options={equipment_data}
              className="w-full"
              placeholder="Select..."
            />
          </div>
          <h1 className=" text-center font-semibold text-gray-600 text-xl">
            or
          </h1>
          <div className="relative w-full min-w-[200px] h-12 my-[2rem]">
            <Input type="text" placeholder="Enter Your required content type" />
          </div>
          <h1 className=" text-center font-semibold text-gray-600 text-xl">
            or
          </h1>
          <div className="container mx-auto flex justify-center">
            <Input
              type="file"
              id="file-upload"
              placeholder="Upload File"
              className="hidden"
            />
            <Label
              htmlFor="file-upload"
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all
            disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs
            rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10
            hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none
            active:opacity-[0.85] active:shadow-none w-[8rem] h-[2rem]"
            >
              Upload File
            </Label>
          </div>

          <div className="space-y-[8px]">
            <Label className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 mb-1 font-medium">
              Project Brief
            </Label>
            <Textarea placeholder="Enter your project description" />
          </div>

          <div className="space-y-[8px]">
            <Label className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 mb-1 font-medium">
              Additional Details
            </Label>
            <Textarea placeholder="Enter your project details" />
          </div>

          <button className=" container  flex justify-center  align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-[8rem]">
            FINISH
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
