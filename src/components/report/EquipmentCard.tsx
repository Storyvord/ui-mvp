export type Equipment = {
  id: string;
  name: string;
  description: string;
  location: string;
  rental_rate: string;
  availability: string;
  features: string;
};

// EquipmentCard Component
const EquipmentCard: React.FC<{ equipment: Equipment }> = ({ equipment }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
      <h3 className="text-xl font-poppins-semibold text-gray-900">{equipment.name}</h3>
      <p className="text-sm font-poppins-regular text-gray-700 mt-2">{equipment.description}</p>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          <span className="font-semibold">Location:</span> {equipment.location}
        </p>
        <p>
          <span className="font-semibold">Rental Rate:</span> {equipment.rental_rate}
        </p>
        <p>
          <span className="font-semibold">Availability:</span> {equipment.availability}
        </p>
        <p>
          <span className="font-semibold">Features:</span> {equipment.features}
        </p>
      </div>
    </div>
  );
};
export default EquipmentCard;
