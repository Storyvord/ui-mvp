import { Button } from "@/components/ui/button";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import CreateBooking from "./CreateBooking";
import { CreateBookingType } from "../type";
import { IoListOutline } from "react-icons/io5";
import { TfiViewGrid } from "react-icons/tfi";
import { GrFormSchedule } from "react-icons/gr";
import { VscFilter } from "react-icons/vsc";

type HeaderProps = {
  list: boolean;
  isFormVisible: boolean;
  handleClickListView: () => void;
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormVisible: () => void;
  onSubmit: (data: CreateBookingType) => void;
};

const Header: React.FC<HeaderProps> = ({
  list,
  isFormVisible,
  setIsFormVisible,
  handleClickListView,
  handleFormVisible,
  onSubmit,
}) => {
  return (
    <div className="w-full z-20">
      <div  className="md:flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleFormVisible}
          className="md:w-auto w-full flex items-center gap-2  hover:bg-gray-50 "
        >
          <FiPlus size={18} />
          Create booking
        </Button>

        <div className="md:flex md:mt-0 mt-3 gap-4 items-center">
          {/* filter */}
          <div className="flex flex-col items-center">
            <div className="p-2 border border-gray-300 hover:bg-gray-50 bg-white rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm">
              <VscFilter size={18} />
            </div>
            <p className="text-[10px] mt-1 font-medium">Schedular</p>
          </div>

          {/* list view */}
          <div className="flex flex-col items-center">
            <div
              onClick={handleClickListView}
              className="p-2 border border-gray-300 hover:bg-gray-50 bg-white rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
            >
              {list ? <IoListOutline size={18} /> : <TfiViewGrid size={18} />}
            </div>
            {list ? (
              <p className="text-[10px] mt-1 font-medium">List view</p>
            ) : (
              <p className="text-[10px] mt-1 font-medium">Tile view</p>
            )}
          </div>

          {/* schedular */}
          <div className="flex flex-col items-center">
            <div className="p-2 border border-gray-300 hover:bg-gray-50 bg-white rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm">
              <GrFormSchedule size={18} />
            </div>
            <p className="text-[10px] mt-1 font-medium">Schedular</p>
          </div>
        </div>
      </div>

      {/* create form  */}
      <div className="mt-4">
        {isFormVisible && (
          <motion.div
            className="w-full border rounded-lg bg-white "
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full p-6">
              <CreateBooking setIsFormVisible={setIsFormVisible} onSubmit={onSubmit} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Header;
