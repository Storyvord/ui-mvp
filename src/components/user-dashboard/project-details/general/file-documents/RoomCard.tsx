import { FC } from "react";

type RoomCardProps = {
  room: {
    id: string;
    title: string;
    description: string;
  };
  onClick: (roomId: string) => void;
};

const RoomCard: FC<RoomCardProps> = ({ room, onClick }) => {
  return (
    <div
      className="relative shadow-md rounded-lg p-4 bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(room.id)}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col space-y-1">
          <h3 className="font-semibold">{room.title}</h3>
          <span className="text-slate-500 text-sm">{room.description}</span>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
