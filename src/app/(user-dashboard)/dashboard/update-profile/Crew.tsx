// "use client";
// import { Project } from "@/types";
// import React, { useState } from "react";

// // Define the Project interface

// const Page: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     formalName: "",
//     role: "",
//     description: "",
//     location: "",
//     countryName: "",
//     locality: "",
//     personalWebsite: "",
//     rating: "",
//     minRate: "",
//     maxRate: "",
//     projects: [
//       {
//         title: "",
//         description: "",
//         link: "",
//         thumbnailUrl: "",
//         createTime: "",
//       },
//     ],
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     index?: number,
//     field?: keyof Project // Use keyof Project to specify allowed keys for project input
//   ) => {
//     const { name, value } = e.target;
//     if (name.startsWith("projects") && index !== undefined && field) {
//       const newProjects = [...formData.projects];
//       newProjects[index][field] = value;
//       setFormData({ ...formData, projects: newProjects });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleAddProject = () => {
//     setFormData({
//       ...formData,
//       projects: [
//         ...formData.projects,
//         {
//           title: "",
//           description: "",
//           link: "",
//           thumbnailUrl: "",
//           createTime: "",
//         },
//       ],
//     });
//   };

//   const handleRemoveProject = (index: number) => {
//     const newProjects = [...formData.projects];
//     newProjects.splice(index, 1);
//     setFormData({ ...formData, projects: newProjects });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Form Data:", formData);
//     // Add your submit logic here
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 bg-white">
//       <h2 className="text-2xl font-semibold mb-4 text-center">
//         Update your profile
//       </h2>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         {(
//           [
//             "firstName",
//             "lastName",
//             "formalName",
//             "role",
//             "location",
//             "countryName",
//             "locality",
//             "rating",
//             "personalWebsite",
//             "minRate",
//             "maxRate",
//           ] as Array<keyof FormData>
//         ).map((field) => (
//           <div className="mt-4" key={field}>
//             <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 font-medium">
//               {field.charAt(0).toUpperCase() +
//                 field.slice(1).replace(/([A-Z])/g, " $1")}
//             </h6>
//             <div className="relative w-full min-w-[200px] h-10">
//               <input
//                 type={
//                   field === "rating" || field.includes("Rate")
//                     ? "number"
//                     : "text"
//                 }
//                 name={field}
//                 placeholder={`Enter your ${field}`}
//                 className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 border border-blue-gray-200 focus:border-2 text-sm px-3 py-2.5 rounded-[7px]"
//                 value={(formData[field] as string) || ""}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//         ))}

//         <div className="mt-4">
//           <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 font-medium">
//             Description
//           </h6>
//           <div className="relative w-full min-w-[200px]">
//             <textarea
//               name="description"
//               placeholder="Enter a brief description"
//               className="peer w-full h-full min-h-[100px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 border border-blue-gray-200 focus:border-2 text-sm px-3 py-2.5 rounded-[7px]"
//               value={formData.description}
//               onChange={handleInputChange}
//             ></textarea>
//           </div>
//         </div>

//         <h3 className="text-xl font-semibold mb-1 mt-4 text-center">
//           Previous Projects
//         </h3>
//         {formData.projects.map((project, index) => (
//           <div key={index} className="space-y-4">
//             {" "}
//             {/* space-y-4 to ensure space between elements */}
//             {(
//               [
//                 "title",
//                 "description",
//                 "link",
//                 "thumbnailUrl",
//                 "createTime",
//               ] as Array<keyof Project>
//             ).map((field) => (
//               <div key={field} className="space-y-1">
//                 {" "}
//                 {/* Additional spacing */}
//                 <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 font-medium">
//                   {field.charAt(0).toUpperCase() +
//                     field.slice(1).replace(/([A-Z])/g, " $1")}
//                 </h6>
//                 {field === "description" ? (
//                   <textarea
//                     name={`projects.${index}.${field}`}
//                     className="peer w-full h-full min-h-[100px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 border border-blue-gray-200 focus:border-2 text-sm px-3 py-2.5 rounded-[7px]"
//                     placeholder=" "
//                     value={(project[field] as string) || ""}
//                     onChange={(e) => handleInputChange(e, index, field)}
//                   ></textarea>
//                 ) : (
//                   <input
//                     name={`projects.${index}.${field}`}
//                     type={field === "createTime" ? "date" : "text"}
//                     className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 border border-blue-gray-200 focus:border-2 text-sm px-3 py-2.5 rounded-[7px]"
//                     placeholder=" "
//                     value={(project[field] as string) || ""}
//                     onChange={(e) => handleInputChange(e, index, field)}
//                   />
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border border-red-500 text-red-500 hover:opacity-75 focus:ring focus:ring-red-200 active:opacity-[0.85] w-full"
//               onClick={() => handleRemoveProject(index)}
//             >
//               Remove Project
//             </button>
//           </div>
//         ))}

//         <button
//           type="button"
//           className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border border-green-500 text-green-500 hover:opacity-75 focus:ring focus:ring-green-200 active:opacity-[0.85] w-full"
//           onClick={handleAddProject}
//         >
//           Add Another Project
//         </button>
//         <button
//           type="submit"
//           className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full mt-4"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Page;
