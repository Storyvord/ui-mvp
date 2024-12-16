"use client";

import React from "react";

const SubscriptionPackages = () => {
  const packages = [
    {
      name: "Indie Package (Essential)",
      description: "For independent filmmakers taking their first steps.",
      price: "Free",
      features: [
        "Project Management Tools",
        "AI Assistance",
        "1 User",
        "3 Projects Limit",
        "Real Human Producer (additional cost)",
      ],
    },
    {
      name: "Studio Package (Professional)",
      description: "For growing studios ready to scale and manage global projects.",
      price: "$7,600 Annually",
      features: [
        "Everything from Indie Package",
        "Marketplace Access (Crew and Suppliers)",
        "3 Users",
        "20 Projects Limit",
        "Unlimited Support from Real Human Producers",
        "Access to Mobile App",
      ],
    },
    {
      name: "Oscar Package (Enterprise)",
      description: "For high-end productions and studios creating cinematic masterpieces.",
      price: "$47,900 Annually",
      features: [
        "Everything from Studio Package",
        "Advanced Creative Tools",
        "Departmental Tools for specialized teams (e.g., Camera, Costume, Props, Art, etc.)",
        "20 Users",
        "100 Projects Limit",
        "Dedicated Account Manager with Real Human Producer Support",
      ],
    },
  ];

  return (
    <div className=" py-10 px-4 md:px-6 lg:px-8 font-poppins">
      <h2 className="text-3xl font-poppins-bold text-center mb-8">Subscription Packages</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="border flex flex-col justify-between rounded-lg p-6 relative shadow-sm hover:shadow-md transition duration-300"
          >
            <h3 className="text-xl font-poppins-semibold mb-2">{pkg.name}</h3>
            <p className="text-gray-600 mb-4">{pkg.description}</p>
            <ul className="text-gray-700 mb-4 list-disc list-inside space-y-1">
              {pkg.features.map((feature, i) => (
                <li key={i} className="ml-2">
                  {feature}
                </li>
              ))}
            </ul>
            <p className="text-lg font-poppins-semibold mt-auto">Price: {pkg.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPackages;
