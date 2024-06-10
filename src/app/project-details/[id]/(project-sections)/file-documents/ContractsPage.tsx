"use client";

import React, { FC, useState } from 'react';
import { Contracts, Plus, Find, List, Sort } from './ui/docsIcons';
import { Button } from '@/components/ui/button';
import { contracts, icons } from './constants/const';
import { useForm, SubmitHandler } from 'react-hook-form';

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

interface FormData {
  roomName: string;
  roomDesc: string;
}

const IconWrapper: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className='size-xl'>
    {children}
  </div>
);

const ContractsPage: FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentContract, setCurrentContract] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data);
    setShowForm(false);
    reset();
  };

  const handleContractClick = (title: string) => {
    setCurrentContract(title);
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
  };

  if (currentContract) {
    const SelectedContractComponent = contractComponents[currentContract];
    return SelectedContractComponent ? <SelectedContractComponent /> : null;
  }

  return (
    <section className=''>
      <div className='py-5 flex flex-row gap-2 -mb-2 mt-5'>
        <IconWrapper>
          <Contracts />
        </IconWrapper>

        <div className='flex flex-col -mt-2'>
          <span className='text-2xl font-medium'>Contracts</span>
          <span className='text-slate-500 text-xs'>
            You can find contracts for actors, insurances and more here.
          </span>
        </div>
      </div>
      <div className='text-black mt-2 flex flex-col md:flex-row lg:flex-row items-center lg:justify-between md:justify-between'>
        <div className='flex'>
          <Button variant="outline" className='w-26 h-12 flex flex-row' onClick={() => setShowForm(true)}>
            <Plus />
            <span className='font-semibold ml-2'>Create Room</span>
          </Button>
        </div>
        <div className='flex space-x-1 mt-4'>
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
      <div className='mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {contracts.map(({ icon, title, description }, index) => {
          const IconComponent = icons[icon];
          return (
            <div
              key={index}
              className='shadow-md rounded-lg p-4 bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer'
              onClick={() => handleContractClick(title)} // Add onClick event handler
            >
              <IconComponent className='w-6 h-6 mb-2' />
              <h3 className='font-semibold'>{title}</h3>
              <p className='text-sm text-slate-400'>{description}</p>
            </div>
          );
        })}
      </div>

      {showForm && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center shadow-lg'>
          <div className='bg-white p-6 rounded w-96 max-h-full'>
            <div className='flex justify-between items-center pb-2 mb-4'>
              <h2 className='text-xl font-medium'>Create Room</h2>
              <button onClick={() => { setShowForm(false); reset(); }}>
                <span className='text-2xl font-light'>&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className='block mb-2 text-xs'>
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
                <label className='block mb-2 text-xs'>
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
              <div className='flex flex-col'>
                <label className='text-medium'>Select Icon</label>
                <div className='grid lg:grid-cols-6 md:grid-cols-6 grid-cols-6 lg:gap-2 md:gap-2 gap-2 px-4 py-4 cursor-pointer text-slate-400'>
                  {Object.entries(icons).map(([key, Icon], index) => (
                    <Icon key={index} className='' />
                  ))}
                </div>
              </div>
              <footer className='pt-4 flex justify-end space-x-3 mt-4'>
                <Button onClick={() => { setShowForm(false); reset(); }} type="button" variant="outline">Cancel</Button>
                <Button type="submit">Create</Button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContractsPage;