import React from "react";
import LoadingUi from "../LoadingUi";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CultureData {
  location: string;
  data: string[];
}

interface CulturePageProps {
  data: CultureData[] | null;
  report: string;
  isPending: boolean;
  isError: boolean;
}

const CulturePage: React.FC<CulturePageProps> = ({ data, isPending, isError, report }) => {
  if (isPending) {
    return <LoadingUi isPending={isPending} text="Getting culture suggestions..." />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-poppins-semibold text-red-600">
          An error occurred while fetching data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {/* <h2 className="text-2xl font-bold mb-4">Culture Details</h2>
      {data?.map((locationData, index) => (
        <div key={index} className="border p-4 rounded shadow-sm">
          <h3 className="text-xl font-bold mb-2">{locationData.location}</h3>
          <ul className="list-disc pl-5">
            {locationData.data.map((item, idx) => (
              <li key={idx} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))} */}
      <Markdown
        components={{
          a({ children, href }) {
            return (
              <a href={href} target={"_blank"}>
                {children}
              </a>
            );
          },
        }}
        remarkPlugins={[remarkGfm]}
      >
        {report}
      </Markdown>
    </div>
  );
};

export default CulturePage;
