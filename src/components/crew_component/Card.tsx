import { FC } from "react";

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

interface CardProps {
  crew: CrewMember;
}

const Card: FC<CardProps> = ({ crew }) => {
  const { user_details } = crew;

  return (
    <div className="border rounded-lg shadow-lg bg-white p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
      {/* Left Side: Image */}
      <div className="flex-shrink-0">
        <img
          src={`https://randomuser.me/api/portraits/lego/${Math.floor(
            Math.random() * 10
          )}.jpg`}
          alt={user_details.name}
          className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
        />
      </div>
      {/* Right Side: Details */}
      <div className="flex-grow text-center md:text-left">
        <h3 className="text-xl font-semibold text-blue-600 mb-2">
          {user_details.roleJobTitle}
        </h3>
        <p className="text-lg text-gray-900 mb-2">
          <strong>{user_details.name}</strong>
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Location:</strong> {user_details.location}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Years of Experience:</strong> {user_details.yoe} years
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Skills:</strong> {user_details.expertise.join(", ")}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Services:</strong> {user_details.services.join(", ")}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Tags:</strong> {user_details.tags.join(", ")}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Min Rate/Day:</strong> ${user_details.minRatePerDay}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Max Rate/Day:</strong> ${user_details.maxRatePerDay}
        </p>
        {/* <p className="italic text-sm text-gray-500">{crew.Preferred_because}</p> */}
        <div className="mt-4 flex justify-center md:justify-start space-x-2">
          <button className="px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            View Profile
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            Hire
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
