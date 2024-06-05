"use client";

import { Button } from '@/components/ui/button';
import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Contracts, Find, List, Plus, Script, Sheet, Sort } from './ui/docsIcons';


type FormData = {
    roomName: string;
    roomDesc: string;
};

const File: FC = () => {
    const [showForm, setShowForm] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [files] = useState<{ icon: React.ElementType, title: string, description: string }[]>([
        {
            icon: Contracts,
            title: 'Contracts',
            description: 'You can find contracts for actors, insurances and more here.',
        },
        {
            icon: Script,
            title: 'Script & Development',
            description: 'You can find everything related to development here.',
        },
        {
            icon: Sheet,
            title: 'Sent Call Sheets',
            description: 'You can find copies of your call sheets here after sending them to your crew.',
        }
    ]);

    const onSubmit: SubmitHandler<FormData> = data => {
        // Placeholder for form submission logic
        console.log(data);
        setShowForm(false);
        reset();
    };

    return (
        <section className='font-sans'>
            <div className='text-black text-xl lg:text-2xl md:text-2xl font-semibold underline underline-offset-8 md:underline-offset-8 text-center lg:text-left md:text-left mt-8'>Files & Documents</div>
            <div className='text-black mt-8 flex flex-col md:flex-row lg:flex-row items-center lg:justify-between md:justify-between'>
                <div className='flex'>
                    <Button variant="outline" className='w-26 h-12 flex flex-row' onClick={() => setShowForm(true)}>
                        <Plus />
                        Create Room
                    </Button>
                </div>
                <div className='flex space-x-1 mt-4'>
                    <Button variant="outline" size="icon">
                        <Find />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Sort />
                    </Button>
                    <Button variant="outline" size='icon'>
                        <List />
                    </Button>
                </div>
            </div>
            <div className='text-xl lg:space-x-4 md:space-x-3 mt-8 flex flex-col lg:flex-row md:flex-row items-center space-y-5 lg:space-y-0 md:space-y-0'>
                {files.map((file, index) => (
                    <div key={index} className='w-80 h-44 shadow items-start flex bg-white border-1.5 hover:cursor-pointer rounded'>
                        <div className='py-5 px-5 flex flex-col space-y-1'>
                            <file.icon />
                            <a href="#" className='text-lg'>{file.title}</a>
                            <span className='text-black text-xs'>{file.description}</span>
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center shadow-lg'>
                    <div className='bg-white p-6 rounded w-96'>
                        <div className='flex justify-between items-center border-b pb-2 mb-4'>
                            <h2 className='text-xl font-medium'>Create Room</h2>
                            <button onClick={() => { setShowForm(false); reset(); }}>
                                <span className='text-2xl font-light'>&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className='block mb-2 text-sm'>
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className={`w-full p-2 border ${errors.roomName ? 'border-red-500' : 'border-gray-300'} rounded mb-4`}
                                    type="text"
                                    {...register("roomName", { required: "Name is required" })}
                                />
                                {errors.roomName && (
                                    <span className="text-red-500 text-sm">{errors.roomName.message}</span>
                                )}
                            </div>
                            <div>
                                <label className='block mb-2 text-sm'>
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    className={`w-full p-2 border ${errors.roomDesc ? 'border-red-500' : 'border-gray-300'} rounded mb-4`}
                                    {...register("roomDesc", { required: "Description is required" })}
                                />
                                {errors.roomDesc && (
                                    <span className="text-red-500 text-sm">{errors.roomDesc.message}</span>
                                )}
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-medium'>Select Icon</label>
                                <div className='flex flex-wrap space-x-2 px-2 py-2 size-md cursor-pointer'>
                                    <Script />
                                    <Sheet />
                                    <Contracts />

                                </div>
                            </div>
                            <div className='border-t pt-4 flex justify-end space-x-3 mt-4'>
                                <Button onClick={() => { setShowForm(false); reset(); }} type="button" variant="outline">Cancel</Button>
                                <Button type="submit">Create</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default File;