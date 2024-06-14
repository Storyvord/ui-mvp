"use client";

import React, { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Contracts, Plus, Find, List, Sort } from './ui/docsIcons';
import { MoreVertical, Images, Trash } from 'lucide-react';
import { contracts, icons } from './constants/const';

// Import the individual contract components
import Animals from './Contracts/animals';
import Costumes from './Contracts/costumes';
import Insurances from './Contracts/insurances';
import Bank from './Contracts/bank';
import Cast from './Contracts/cast';
import Rights from './Contracts/rights';
import Financing from './Contracts/overallFinancing';
import Bond from './Contracts/completionBond'
import Locations from './Contracts/location'
import Product from './Contracts/productDesign'
import Miscellaneous from './Contracts/misc';
import Crew from './Contracts/crew';

interface FormData {
  roomName: string;
  roomDesc: string;
  icon: keyof typeof icons;
}

type RoomDataType = {
  icon: keyof typeof icons;
  title: string;
  description: string;
};

const IconWrapper: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="size-xl">
    {children}
  </div>
);

const ContractsPage: FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentContract, setCurrentContract] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>();
  const [selectedIconIndex, setSelectedIconIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [createdRooms, setCreatedRooms] = useState<RoomDataType[]>([]);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(null);
  const [changingIconForRoomIndex, setChangingIconForRoomIndex] = useState<number | null>(null);

  const onSubmit: SubmitHandler<FormData> = data => {
    setLoading(true);
    const newRoom: RoomDataType = {
      icon: data.icon,
      title: data.roomName,
      description: data.roomDesc,
    };
    setTimeout(() => {
      setCreatedRooms([...createdRooms, newRoom]);
      setLoading(false);
      setShowForm(false);
      reset();
      setSelectedIconIndex(null);
    }, 1000); // Simulate API call delay
  };

  const handleContractClick = (title: string) => {
    setCurrentContract(title);
  };

  const handleDotClick = (index: number) => {
    setSelectedRoomIndex(index === selectedRoomIndex ? null : index);
  };

  const handleDeleteRoom = (index: number) => {
    setCreatedRooms(rooms => rooms.filter((_, i) => i !== index));
    setSelectedRoomIndex(null);
  };

  const handleOpenChangeIconModal = (index: number) => {
    setChangingIconForRoomIndex(index);
    setSelectedIconIndex(null);  // Reset selected icon index when opening the modal
  };

  const handleCloseChangeIconModal = () => {
    setChangingIconForRoomIndex(null);
  };

  const handleIconSelect = (newIcon: keyof typeof icons) => {
    if (changingIconForRoomIndex !== null) {
      setCreatedRooms(rooms =>
        rooms.map((room, i) => i === changingIconForRoomIndex ? { ...room, icon: newIcon } : room)
      );
      handleCloseChangeIconModal();
    }
  };

  const contractComponents: { [key: string]: React.ElementType } = {
    'Animals': Animals,
    'Costumes': Costumes,
    'Insurances': Insurances,
    'Cast': Cast,
    'Bank': Bank,
    'Rights': Rights,
    'Overall Financing': Financing,
    'Completion Bond': Bond,
    'Locations': Locations,
    'Production Design': Product,
    'Miscellaneous Contracts': Miscellaneous,
    'Crew': Crew,
  };

  if (currentContract) {
    const SelectedContractComponent = contractComponents[currentContract];
    return SelectedContractComponent ? <SelectedContractComponent /> : null;
  }

  return (
    <section className="">
      <div className="py-5 flex flex-row gap-2 -mb-2 mt-5">
        <IconWrapper>
          <Contracts />
        </IconWrapper>

        <div className="flex flex-col -mt-2">
          <span className="text-2xl font-medium">Contracts</span>
          <span className="text-slate-500 text-xs">You can find contracts for actors, insurances and more here.</span>
        </div>
      </div>
      <div className="text-black mt-2 flex flex-col md:flex-row lg:flex-row items-center lg:justify-between md:justify-between">
        <div className="flex">
          <Button variant="outline" className="w-26 h-12 flex flex-row" onClick={() => setShowForm(true)}>
            <Plus />
            <span className="font-semibold ml-2">Create Room</span>
          </Button>
        </div>
        <div className="flex space-x-1 mt-4">
          <Button variant="outline" size="icon">
            <Find />
          </Button>
          <Button variant="outline" size="icon">
            <Sort />
          </Button>
          <Button variant="outline" size="icon">
            <List />
          </Button>
        </div>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {
          // Combine predefined contracts and created rooms for display
          [...contracts, ...createdRooms].map(({ icon, title, description }, index) => {
            const IconComponent = icons[icon];
            return (
              <div
                key={index}
                className="relative shadow-md rounded-lg p-4 bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => index < contracts.length && handleContractClick(title)} // Only for predefined contracts
              >
                <div className='flex justify-between items-start'>
                  <div className='flex flex-col space-y-1'>
                    <IconComponent className="w-6 h-6 mb-2" />
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-slate-400">{description}</p>
                  </div>
                  {index >= contracts.length && ( // Only for created rooms
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0 p-1 text-gray-500"
                        onClick={() => handleDotClick(index)}
                        style={{ fontSize: '1.2rem', padding: '0.1rem' }}
                      >
                        <MoreVertical />
                      </Button>
                      {selectedRoomIndex === index && (
                        <div className="absolute right-0 mt-8 bg-white border border-gray-200 rounded shadow-lg p-2 w-32">
                          <button
                            className="w-full text-left text-xs px-2 py-1 border-b hover:bg-gray-100 flex items-center"
                            onClick={() => handleOpenChangeIconModal(index - contracts.length)}
                          >
                            <Images className="mr-2 h-4 w-4" /> Change Icon
                          </button>
                          <button
                            className="w-full text-left text-xs text-red-500 px-2 py-1 hover:bg-gray-100 flex items-center"
                            onClick={() => {
                              handleDeleteRoom(index - contracts.length);
                            }}
                          >
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        }
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center shadow-lg">
          <div className="bg-white p-8 rounded-lg w-96 max-h-full shadow-xl transform transition-transform duration-300">
            <div className='flex justify-center items-center pb-2 mb-4 border-b'>
              <h2 className='text-2xl font-medium'>Create Room</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block mb-2 text-xs">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  className={`w-full p-2 border ${errors.roomName ? 'border-red-500' : 'border-gray-200'} rounded mb-4`}
                  type="text"
                  {...register("roomName", { required: "Name is required" })}
                />
                {errors.roomName && (
                  <span className="text-red-500 text-sm">{errors.roomName.message}</span>
                )}
              </div>
              <div>
                <label className="block mb-2 text-xs">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  className={`w-full p-2 border ${errors.roomDesc ? 'border-red-500' : 'border-gray-200'} rounded mb-4`}
                  {...register("roomDesc", { required: "Description is required" })}
                />
                {errors.roomDesc && (
                  <span className="text-red-500 text-sm">{errors.roomDesc.message}</span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-medium">Select Icon</label>
                <div className="grid lg:grid-cols-6 md:grid-cols-6 grid-cols-6 lg:gap-2 md:gap-2 gap-2 px-4 py-4 cursor-pointer text-slate-400">
                  {Object.entries(icons).map(([key, Icon], index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setValue('icon', key as keyof typeof icons);
                        setSelectedIconIndex(index);
                      }}
                      className={`p-2 rounded cursor-pointer ${selectedIconIndex === index ? 'text-black' : 'text-slate-400'} ${selectedIconIndex === index && 'hover:opacity-75'}`}
                    >
                      <Icon />
                    </div>
                  ))}
                </div>
                {errors.icon && (
                  <span className="text-red-500 text-sm">{errors.icon.message}</span>
                )}
              </div>
              <footer className="pt-4 flex justify-end space-x-3 mt-4">
                <Button onClick={() => { setShowForm(false); reset(); setSelectedIconIndex(null); }} type="button" variant="outline">Cancel</Button>
                <Button type="submit" variant="default">
                  {loading ? "Creating..." : "Create"}
                </Button>
              </footer>
            </form>
          </div>
        </div>
      )}

      {changingIconForRoomIndex !== null && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center shadow-lg">
          <div className="bg-white p-6 rounded w-96 max-h-full">
            <div className="flex justify-between items-center pb-2 mb-2">
              <h2 className="text-xl font-medium">Change Icon</h2>
              <button onClick={handleCloseChangeIconModal}>
                <span className="text-2xl font-light">&times;</span>
              </button>
            </div>
            <div className="grid lg:grid-cols-6 md:grid-cols-6 grid-cols-6 lg:gap-2 md:gap-2 gap-2 px-4 py-4 cursor-pointer text-slate-400">
              {Object.entries(icons).map(([key, Icon], index) => (
                <div
                  key={index}
                  onClick={() => handleIconSelect(key as keyof typeof icons)}
                  className={`p-2 rounded cursor-pointer ${selectedIconIndex === index ? 'text-black hover:opacity-75' : 'text-slate-400'}`}
                >
                  <Icon />
                </div>
              ))}
            </div>
            <footer className="pt-4 flex justify-end space-x-3 mt-1">
              <Button onClick={handleCloseChangeIconModal} type="button" variant="outline">Close</Button>
            </footer>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContractsPage;