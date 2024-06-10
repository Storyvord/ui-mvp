"use client";

import React, { FC, useState } from 'react';
import { Plus, Find, Sort, List, Script } from './ui/docsIcons';
import { FolderOpen, EllipsisVertical, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FormData = {
  name: string;
  file: File | null;
};

const scriptsFiles = [
  {
    // icon: PaperClip,
    title: 'Ideas & Notes',
    description: 'Contains no files.',
    onClick: () => console.log("Ideas & Notes Clicked"),
  },
  {
    // icon: PaperClip,
    title: 'Script',
    description: 'Contains no files.',
    onClick: () => console.log("Script Clicked"),
  },
];

const ScriptsPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: '', file: null });
  const [errors, setErrors] = useState<{ name?: string, file?: string }>({});
  const [transformIconIndex, setTransformIconIndex] = useState<number | null>(null);

  const handleCreateObject = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', file: null });
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prevData) => ({ ...prevData, file }));
  };

  const validateForm = () => {
    const newErrors: { name?: string, file?: string } = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.file) newErrors.file = 'File is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Submitted", formData);
      handleCloseModal();
    }
  };

  const handleDelete = (fileIndex: number) => {
    console.log(`Delete ${scriptsFiles[fileIndex].title} clicked.`);
  };

  return (
    <section>

      <div className='py-5 flex flex-row gap-2 -mb-2 mt-5'>
        <Script />
        <div className='flex flex-col -mt-2'>
          <span className='text-2xl font-medium'>Scripts & Development</span>
          <span className='text-slate-500 text-xs'>
            You can find everything related to development here.
          </span>
        </div>
      </div>
      <div className='text-black mt-2 flex flex-col md:flex-row lg:flex-row items-center lg:justify-between md:justify-between'>
        <div className='flex'>
          <Button variant="outline" className='w-26 h-12 flex flex-row' onClick={handleCreateObject}>
            <Plus />
            <span className='font-semibold ml-2'>Create Object</span>
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
      <div className="mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {scriptsFiles.map((file, index) => (
          <div key={index} className="relative w-full h-60 md:h-64 lg:h-64 shadow-md rounded-lg bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={file.onClick}>
            <div className="h-[80%]"></div>
            <div className="absolute bottom-0 left-0 w-full h-[20%] bg-white flex items-center justify-between p-4 border-t border-gray-200">
              <div className=''>
                <h3 className="font-thin text-slate-400">{file.title}</h3>
                <span className="text-slate-300 text-sm font-thin">{file.description}</span>
              </div>
              <div className="relative">
                <button className="text-gray-500 hover:text-rose-500" onClick={(e) => {
                  e.stopPropagation();
                  setTransformIconIndex(transformIconIndex === index ? null : index);
                }} onMouseEnter={() => setTransformIconIndex(index)} onMouseLeave={() => setTransformIconIndex(null)}>
                  {transformIconIndex === index ? <Trash2 /> : <EllipsisVertical />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded w-96 max-h-full'>
            <div className='flex justify-between items-center pb-2 mb-4'>
              <h2 className='text-xl font-medium'>Create Object</h2>
              <button onClick={handleCloseModal}>
                <span className='text-2xl font-light'>&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label className='block mb-2 text-xs'>
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded mb-4`}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>
              <div>
                <label className='block mb-2 text-xs'>
                  Choose a file <span className="text-red-500">*</span>
                </label>
                <div className="relative mb-4 border-2 border-dashed border-gray-200 rounded flex flex-col items-center justify-center py-10">
                  <FolderOpen className="text-blue-500 w-10 h-10 mb-4" />
                  <label className="block text-xs text-slate-500 mb-2">
                    Drag and Upload File
                  </label>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                  {errors.file && (
                    <span className="text-red-500 text-sm">{errors.file}</span>
                  )}
                </div>
              </div>
              <footer className='pt-4 flex justify-end space-x-3 mt-4'>
                <Button onClick={handleCloseModal} type="button" variant="outline">Cancel</Button>
                <Button type="submit">Create</Button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ScriptsPage;