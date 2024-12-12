"use client";

import React, { useState, useEffect } from "react";
import LoadingUi from "./LoadingUi";
import EquipmentCard, { Equipment } from "./EquipmentCard";

type EquipmentRequirements = {
  message: string;
  data: Equipment[];
};
type EquipmentPageProps = {
  equipmentRequirements: EquipmentRequirements;
  isPending: boolean;
  isError: boolean;
};

const EquipmentPage: React.FC<EquipmentPageProps> = ({
  equipmentRequirements,
  isPending,
  isError,
}) => {
  if (isPending) {
    return <LoadingUi isPending={isPending} text="AI is matching the best-fit suppliers..." />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-poppins-semibold text-red-600">
          An error occurred while fetching equipment data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-center font-poppins-semibold text-2xl text-gray-900">
        {equipmentRequirements?.message}
      </h1>
      <section className="space-y-8">
        {equipmentRequirements?.data.map((equipment) => (
          <EquipmentCard key={equipment.id} equipment={equipment} />
        ))}
      </section>
    </div>
  );
};

export default EquipmentPage;
