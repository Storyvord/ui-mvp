import React from "react";

type EndorsementsProps = {
  endorsements: {
    text: string;
    givenBy: string;
    crew: number;
  }[];
};

const Endorsements = ({ endorsements }: EndorsementsProps) => {
  if (endorsements?.length === 0) return null;

  return (
    <div className="bg-white p-6 shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Endorsements</h2>
      {endorsements?.map((endorsement, index) => (
        <div key={index} className="border-b border-gray-200 py-2">
          <p className="text-gray-800">{endorsement?.text}</p>
          <p className="text-sm text-gray-500 mt-1">- {endorsement?.givenBy}</p>
        </div>
      ))}
    </div>
  );
};

export default Endorsements;
