import Dropdown from "@/components/ui/Dropdown";
import CustomDatePicker from "@/components/ui/DatePicker";
import StyledInput from "@/components/ui/StyledInput";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface FormData {
  project_name: string;
  content_type: string;
  budget: string;
  shoot_location: string;
  start_date: string;
  end_date: string;
  filming_permits: boolean;
  mode_of_shooting: string;
  select_crew: string;
  equipment: string;
  project_brief: string;
  additional_details: string;
}

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

const mode_of_shooting = ["Indoor", "Outdoor", "Mix(Indoor & Outdoor)"];

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

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    project_name: "",
    content_type: "",
    budget: "",
    shoot_location: "",
    start_date: "",
    end_date: "",
    filming_permits: false,
    mode_of_shooting: "",
    select_crew: "",
    equipment: "",
    project_brief: "",
    additional_details: "",
  });
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value, type, checked } = e.target;

    // Update the state based on the type of the input element
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectCountry = (country: string) => {
    console.log("Selected country:", country);
    // Add your logic here to handle the selected country
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [displayData, setDisplayData] = useState<string | null>(null);

  // Function to handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Assuming you only want to handle the first selected file
      setSelectedFile(files[0]);
    }
  };

  const handleAddButtonClick = (): void => {
    const data = `
      Shoot Location: ${formData.shoot_location}
      Start Date: ${startDate}
      End Date: ${startDate}
      Filming permits: ${formData.filming_permits ? "Yes" : "No"}
      Mode: ${formData.mode_of_shooting}
    `;
    setDisplayData(data);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-auto bg-[#eee]">
      <div className="flex flex-col justify-center items-center h-auto ">
        <h1 className=" text-center md:mt-1 md:mb-6 md:text-3xl text-xl font-semibold underline">
          Create a new Project
        </h1>
        <div className="w-full shadow-md space-y-8 mx-auto max-w-[650px] mt-4 lg:mt-4 lg:w-3/5 bg-white p-4">
          <form onSubmit={handleSubmit} className="mx-auto">
            <div className="mb-6">
              <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 -mb-3 font-medium">
                Project Name
              </h5>
              <div>
                <input
                  type="text"
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleChange}
                  placeholder="Enter your project title"
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-b placeholder-shown:border-blue-gray-200 text-sm px-px pt-5 pb-2 border-blue-gray-200 focus:border-blue-500  focus:border-b-2 focus:border-[#6DA3E9]"
                />
              </div>
            </div>

            <div className=" space-y-[8px]">
              <h1 className=" block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 -mb-1 font-medium">
                Select Content type
              </h1>
              <div className="pt-2">
                <Dropdown
                  data={content_type}
                  onSelectCountry={handleSelectCountry}
                  placeholder="Select.."
                  // className="w-full border-blue-500"
                />
              </div>
              <h3 className=" text-center font-semibold text-gray-600 text-xl">
                or
              </h3>
              <div className="relative w-full min-w-[200px] h-10">
                <StyledInput placeholder="Enter your required country type" />
              </div>
            </div>

            <div className="mb-6 mt-6">
              <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 -mb-3 font-medium">
                Budget ($)
              </h5>
              <div>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Enter your Budget"
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-b placeholder-shown:border-blue-gray-200 text-sm px-px pt-5 pb-2 border-blue-gray-200 focus:border-blue-500  focus:border-b-2 focus:border-[#6DA3E9]"
                />
              </div>
            </div>

            <div className="mb-6">
              <h1 className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 -mb-3 font-medium">
                Shoot Location/s
              </h1>

              <div>
                <input
                  type="text"
                  name="shoot_location"
                  value={formData.shoot_location}
                  onChange={handleChange}
                  placeholder="Enter your Project Location"
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-b placeholder-shown:border-blue-gray-200 text-sm px-px pt-5 pb-2 border-blue-gray-200 focus:border-blue-500  focus:border-b-2 focus:border-[#6DA3E9]"
                />
              </div>
            </div>

            <div className="  px-4 md:flex justify-between items-center space-y-4">
              <div>
                <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 font-medium">
                  Tentative Start Date
                </h6>
                <div className="relative w-full min-w-[200px] h-10">
                  <CustomDatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
              <div>
                <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 font-medium">
                  Tentative End Date
                </h6>
                <CustomDatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>

            <div className="px-4 flex items-center gap-6">
              <label className="mb-1 font-medium text-gray-900">
                Filming permits
              </label>
              <input
                type="checkbox"
                className="w-3 h-3"
                onChange={handleChange}
                name="filming_permits"
                checked={formData.filming_permits}
              />
            </div>
            <div className="px-4 flex items-center mt-4 gap-4">
              <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 font-medium">
                Mode of shooting:
              </h6>
              <div className="w-auto">
                <Dropdown
                  data={mode_of_shooting}
                  onSelectCountry={handleSelectCountry}
                  placeholder="Select.."
                  className="border border-gray-400 rounded-md p-2"
                />
              </div>
            </div>

            <Button
              onClick={handleAddButtonClick}
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none mx-4"
            >
              Add
            </Button>

            {displayData && (
              <div className="w-full lg:w-auto lg:max-w-lg mx-auto mt-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Form Data:</h2>
                  <pre className="whitespace-pre-wrap overflow-x-auto">
                    {displayData}
                  </pre>
                </div>
              </div>
            )}

            <div>
              <div className="space-y-[8px] mt-8">
                <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 -mb-1 font-medium">
                  Select Crew
                </h5>
                <div className="pt-2">
                  <Dropdown
                    data={crew_data}
                    placeholder="Select.."
                    onSelectCountry={handleSelectCountry}
                  />
                </div>
                <h3 className="text-center font-semibold text-gray-600 text-xl">
                  or
                </h3>
                <StyledInput
                  placeholder="Enter your required country type"
                  onChange={handleChange}
                  name="select_crew"
                  value={formData.select_crew}
                />
              </div>

              <div className="space-y-[8px] mt-8">
                <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 -mb-1 font-medium">
                  Equipment
                </h5>
                <div className="pt-2">
                  <Dropdown
                    data={equipment_data}
                    placeholder="Select.."
                    onSelectCountry={handleSelectCountry}
                  />
                </div>
                <h3 className="text-center font-semibold text-gray-600 text-xl">
                  or
                </h3>
                <div className="relative w-full min-w-[200px] h-10">
                  <StyledInput
                    placeholder="Enter your required country type"
                    onChange={handleChange}
                    name="equipment"
                    value={formData.equipment}
                  />
                </div>
              </div>
              <div className="flex w-full mt-2 justify-center items-center">
                <input
                  type="file"
                  className="w-[200px] mx-auto opacity-0 absolute"
                  onChange={handleFileChange} // Add onChange event handler to capture file selection
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 ease-in-out"
                >
                  Upload File
                </label>
              </div>
            </div>
            <div className="mb-6">
              <div>
                <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 mb-1 font-medium">
                  Project Brief
                </h5>
                <div className="relative w-full min-w-[200px]">
                  <textarea
                    className="peer w-full h-full min-h-[100px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 !resize-none"
                    placeholder="Enter your text here..."
                    onChange={handleChange}
                    name="project_brief"
                    value={formData.project_brief}
                  ></textarea>
                </div>
              </div>
              <div>
                <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 mb-1 font-medium">
                  Additional Details
                </h5>
                <textarea
                  className="peer w-full h-full min-h-[100px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 !resize-none"
                  placeholder="Enter your text here..."
                  onChange={handleChange}
                  name="additional_details"
                  value={formData.additional_details}
                ></textarea>
              </div>
              <Button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center justify-around mx-auto">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
