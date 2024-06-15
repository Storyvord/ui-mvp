"use client";
import Card from "@/components/crew_component/Card";
import EquipmentCard from "@/components/crew_component/EquipmentCard";
import Filter from "@/components/crew_component/Filter";
import Tabs from "@/components/crew_component/Tabs";
import { EquipmentData } from "@/components/crew_component/equipmentData";
import { FC, useState } from "react";

interface UserDetails {
  name: string;
  userid: string;
  crewType: string;
  roleJobTitle: string;
  services: string[];
  tags: string[];
  expertise: string[];
  yoe: number; // years of experience
  minRatePerDay: number;
  maxRatePerDay: number;
  location: string;
}

interface CrewMember {
  UserId: string;
  Preferred_because: string;
  user_details: UserDetails;
}

interface CrewDataProps {
  crewData: { [category: string]: CrewMember[] };
}

interface Equipment {
  name: string;
  type: string;
  brand: string;
  model: string;
  resolution: string;
  frame_rate: string;
  sensor_type: string;
  connectivity: string[];
  audio_input: string[];
  battery_life: string;
  weight: string;
  accessories: string[];
  rental_price_per_day: string;
  provider: {
    name: string;
    contact: {
      phone: string;
      email: string;
      address: string;
    };
  };
  availability: {
    start_date: string;
    end_date: string;
    status: string;
  };
}

const equipmentData: Equipment[] = EquipmentData;

const EquipmentList: FC<{ equipmentData: Equipment[] }> = ({
  equipmentData,
}) => {
  return (
    <div className="container mx-auto p-4">
      {equipmentData.map((equipment) => (
        <EquipmentCard key={equipment.name} equipment={equipment} />
      ))}
    </div>
  );
};

const crewData: CrewDataProps["crewData"] = {
  Director: [
    {
      UserId: "rajesh.kumar@gmail.com",
      Preferred_because:
        "Rajesh Kumar has expertise in Script Consultation and Visual Storytelling, which are crucial for a small-scale short film production. His leadership skills will be beneficial for managing a compact team. Additionally, his rate is more budget-friendly compared to others, making him a cost-effective choice for this project.",
      user_details: {
        name: "Rajesh Kumar",
        userid: "rajesh.kumar@gmail.com",
        crewType: "Film Crew",
        roleJobTitle: "Director",
        services: ["Direction", "Script Consultation"],
        tags: ["Film", "Direction", "Script"],
        expertise: ["Script Consultation", "Visual Storytelling", "Leadership"],
        yoe: 14,
        minRatePerDay: 950,
        maxRatePerDay: 1400,
        location: "Dubai",
      },
    },
  ],
  CameraOperator: [
    {
      UserId: "sameer.sharma@gmail.com",
      Preferred_because:
        "Sameer Sharma has a balanced skill set in Camera Operation and Lens Selection, which is crucial for a small crew handling diverse shooting conditions. His rate is within the budget, and his experience aligns well with the project's requirements.",
      user_details: {
        name: "Sameer Sharma",
        userid: "sameer.sharma@gmail.com",
        crewType: "Film Crew",
        roleJobTitle: "Camera Operator",
        services: ["Camera Operation", "Lens Selection"],
        tags: ["Film", "Camera", "Lens"],
        expertise: ["Lens Selection", "Camera Operation", "Technical Skills"],
        yoe: 7,
        minRatePerDay: 500,
        maxRatePerDay: 750,
        location: "Dubai",
      },
    },
  ],
  MakeupArtist: [
    {
      UserId: "sunita.reddy217@gmail.com",
      Preferred_because:
        "Sunita Reddy has extensive experience in both makeup and hair styling, which is crucial for a small crew handling multiple tasks. Her expertise in bridal makeup indicates a high level of skill and attention to detail, which will be beneficial for the close-up shots in a short film. Additionally, her rate is reasonable, making her a cost-effective choice for the project.",
      user_details: {
        name: "Sunita Reddy",
        userid: "sunita.reddy217@gmail.com",
        crewType: "Film Crew",
        roleJobTitle: "Makeup Artist and Hair Stylist",
        services: ["Makeup", "Hair Styling"],
        tags: ["Live Telecast", "Makeup", "Hair Styling"],
        expertise: ["Makeup", "Hair Styling", "Bridal Makeup"],
        yoe: 8,
        minRatePerDay: 560,
        maxRatePerDay: 810,
        location: "Dubai",
      },
    },
  ],
};

const CrewList: FC<
  CrewDataProps & { activeTab: string; filterTerm: string }
> = ({ crewData, activeTab, filterTerm }) => {
  const filteredCrewData: { [category: string]: CrewMember[] } = Object.keys(
    crewData
  ).reduce((acc, category) => {
    const filteredCrew = crewData[category].filter(
      (crew) =>
        crew.user_details.roleJobTitle
          .toLowerCase()
          .includes(filterTerm.toLowerCase()) ||
        crew.user_details.expertise.some((exp) =>
          exp.toLowerCase().includes(filterTerm.toLowerCase())
        )
    );
    if (filteredCrew.length > 0) {
      acc[category] = filteredCrew;
    }
    return acc;
  }, {} as { [category: string]: CrewMember[] });

  return (
    <div className="container mx-auto p-4">
      {Object.keys(filteredCrewData).map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 gap-6">
            {filteredCrewData[category].map((crew) => (
              <Card key={crew.UserId} crew={crew} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Crew: FC = () => {
  const [activeTab, setActiveTab] = useState("Crew");
  const [filterTerm, setFilterTerm] = useState("");
  const [equipmentFilterTerm, setEquipmentFilterTerm] = useState("");

  return (
    <div className="container mx-auto p-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Crew" && (
        <Filter filterTerm={filterTerm} setFilterTerm={setFilterTerm} />
      )}
      {activeTab === "Equipment" && (
        <Filter
          filterTerm={equipmentFilterTerm}
          setFilterTerm={setEquipmentFilterTerm}
          // placeholder="Filter by brand, model, or type..."
        />
      )}

      {activeTab === "Crew" && (
        <CrewList
          crewData={crewData}
          activeTab={activeTab}
          filterTerm={filterTerm}
        />
      )}
      {activeTab === "Equipment" && (
        <EquipmentList equipmentData={equipmentData} />
      )}
    </div>
  );
};

export default Crew;
