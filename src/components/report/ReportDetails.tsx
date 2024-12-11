import React, { ReactNode } from "react";
import LoadingUi from "./LoadingUi";
import Markdown from "react-markdown";
import { Button } from "../ui/button";
import remarkGfm from "remark-gfm";

interface ReportDetailsProps {
  report: string;
  isPending: boolean;
  isError: boolean;
  refetch: () => void;
}
interface ComponentProps {
  children: ReactNode;
}

const ReportDetails = ({ isPending, isError, report, refetch }: ReportDetailsProps) => {
  if (isPending) {
    return <LoadingUi isPending={isPending} text="Getting suggestions..." />;
  }

  if (isError && !isPending) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center pt-8 md:p-6">
        <p className="text-xl font-poppins-semibold text-red-600">
          An error occurred while fetching data. Please try again.
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4 px-4">
      <Markdown
        components={{
          a({ children, href }) {
            return (
              <a href={href} target="_blank" className="text-blue-500 hover:underline">
                {children}
              </a>
            );
          },
          h1({ children }) {
            return <h1 className="text-2xl font-poppins-bold text-gray-900 my-4">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-xl font-poppins-semibold text-gray-800 my-3">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-lg font-poppins-medium text-gray-700 my-2">{children}</h3>;
          },
          strong({ children }) {
            return (
              <strong className="text-base font-poppins-semibold text-gray-800 my-2">
                {children}
              </strong>
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

export default ReportDetails;
