import React, { ReactNode } from "react";
import LoadingUi from "./LoadingUi";
import Markdown from "react-markdown";
import { Button } from "../ui/button";

interface ReportDetailsProps {
  report: string;
  isPending: boolean;
  isError: boolean;
  refetch: () => void;
}
interface ComponentProps {
  children: ReactNode;
}
interface AnchorProps extends ComponentProps {
  href: string;
}
export const mdComponentStyle: Record<string, React.FC<any>> = {
  h1: ({ children }: ComponentProps) => (
    <h1 className="text-2xl font-poppins-bold mb-4">{children}</h1>
  ),
  h2: ({ children }: ComponentProps) => (
    <h2 className="text-xl font-poppins-semibold mb-3">{children}</h2>
  ),
  h3: ({ children }: ComponentProps) => (
    <h3 className="text-lg font-poppins-semibold mb-2">{children}</h3>
  ),
  ul: ({ children }: ComponentProps) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
  ol: ({ children }: ComponentProps) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
  p: ({ children }: ComponentProps) => <p className="text-base leading-relaxed mb-4">{children}</p>,
  a: ({ href, children }: AnchorProps) => (
    <a href={href} className="text-blue-600 hover:underline">
      {children}
    </a>
  ),
  blockquote: ({ children }: ComponentProps) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-4">
      {children}
    </blockquote>
  ),
  code: ({ children }: ComponentProps) => (
    <code className="bg-gray-200 text-sm px-1 py-0.5 rounded">{children}</code>
  ),
  strong: ({ children }: ComponentProps) => (
    <strong className="font-poppins-semibold">{children}</strong>
  ),
  table: ({ children }: ComponentProps) => (
    <table className="w-full border-collapse border border-gray-300 my-4">{children}</table>
  ),
  thead: ({ children }: ComponentProps) => (
    <thead className="bg-gray-100 text-left">{children}</thead>
  ),
  tbody: ({ children }: ComponentProps) => <tbody>{children}</tbody>,
  tr: ({ children }: ComponentProps) => (
    <tr className="even:bg-gray-50 hover:bg-gray-100">{children}</tr>
  ),
  th: ({ children }: ComponentProps) => (
    <th className="border border-gray-300 px-4 py-2 font-bold">{children}</th>
  ),
  td: ({ children }: ComponentProps) => (
    <td className="border border-gray-300 px-4 py-2">{children}</td>
  ),
};

const ReportDetails = ({ isPending, isError, report, refetch }: ReportDetailsProps) => {
  if (isPending) {
    return <LoadingUi isPending={isPending} text="Getting budget suggestions..." />;
  }

  if (isError && !isPending) {
    return (
      <div className="flex justify-center items-center pt-8 md:p-6">
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
    <div className=" space-y-4 md:px-8 border rounded-lg shadow-sm py-3">
      <Markdown className="font-poppins" components={mdComponentStyle}>
        {report}
      </Markdown>
    </div>
  );
};

export default ReportDetails;
