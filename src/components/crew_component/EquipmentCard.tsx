import { FC } from "react";

interface Provider {
  name: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}

interface Availability {
  start_date: string;
  end_date: string;
  status: string;
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
  provider: Provider;
  availability: Availability;
}

interface EquipmentCardProps {
  equipment: Equipment;
}

const EquipmentCard: FC<EquipmentCardProps> = ({ equipment }) => {
  const {
    brand,
    model,
    resolution,
    frame_rate,
    battery_life,
    rental_price_per_day,
    provider,
    availability,
  } = equipment;

  return (
    <div className="border rounded-lg shadow-lg bg-white p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
      {/* Left Side: Image */}
      <div className="flex-shrink-0">
        <img
          src="https://via.placeholder.com/200" // Replace with actual image URL
          alt={`${brand} ${model}`}
          className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
        />
      </div>
      {/* Right Side: Details */}
      <div className="flex-grow text-center md:text-left">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {brand} {model}
        </h3>
        <p className="text-lg text-gray-900 mb-2">
          <strong>Resolution:</strong> {resolution}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Frame Rate:</strong> {frame_rate}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Battery Life:</strong> {battery_life}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Rental Price/Day:</strong> {rental_price_per_day}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Provider:</strong> {provider.name}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Contact:</strong> {provider.contact.phone},{" "}
          {provider.contact.email}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Availability:</strong> {availability.status} (
          {availability.start_date} to {availability.end_date})
        </p>
      </div>
    </div>
  );
};

export default EquipmentCard;
