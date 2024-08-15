import React from "react";

interface CreditProps {
  credits: {
    title: string;
    year: string;
    role: string;
    production: string;
    client: string;
    type_of_content: string;
    tags: string;
    crew: number;
  }[];
}

const fields = [
  { key: "title", label: "Title" },
  { key: "year", label: "Year" },
  { key: "role", label: "Role" },
  { key: "production", label: "Production" },
  { key: "client", label: "Client" },
  { key: "type_of_content", label: "Type of Content" },
  { key: "tags", label: "Tags" },
  { key: "crew", label: "Crew Count" },
];

const Credit = ({ credits }: CreditProps) => {
  if (credits?.length === 0) return null;
  return (
    <div className="bg-white p-6 shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Credit</h2>
      {credits?.map((item, index) => (
        <div key={index + item.title} className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.key} className="flex items-center gap-4">
                <h3 className="text-[16px] font-medium" >{field.label}:</h3>
                <p className="text-gray-700 text-sm">{item[field.key as keyof typeof item]}</p>
              </div>
            ))}
          </div>
          <hr className="my-2" />
        </div>
      ))}
    </div>
  );
};

export default Credit;
