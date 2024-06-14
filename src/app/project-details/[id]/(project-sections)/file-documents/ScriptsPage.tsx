"use client";

import React, { FC, useState, useEffect } from 'react';
import { Plus, Find, Sort, List, Script } from './ui/docsIcons';
import { FolderOpen, Trash2, X, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type FormData = {
  name: string;
  files: File[];
};

type FolderData = {
  title: string;
  description: string;
  files: File[];
};

const initialFolders: FolderData[] = [
  {
    title: 'Ideas & Notes',
    description: 'Contains no files.',
    files: [],
  },
  {
    title: 'Script',
    description: 'Contains no files.',
    files: [],
  },
];

const ScriptsPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: '', files: [] });
  const [errors, setErrors] = useState<{ name?: string, files?: string }>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [folders, setFolders] = useState<FolderData[]>(initialFolders);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<FolderData | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [folderToDeleteIndex, setFolderToDeleteIndex] = useState<number | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCreateObject = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', files: [] });
    setErrors({});
    setEditIndex(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFormData((prevData) => ({ ...prevData, files: prevData.files.concat(files) }));
  };

  const handleFileRemove = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      files: prevData.files.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors: { name?: string, files?: string } = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (formData.files.length === 0) newErrors.files = 'At least one file is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const newObject: FolderData = {
        title: formData.name,
        description: `Contains ${formData.files.length} ${formData.files.length > 1 ? 'files' : 'file'}.`,
        files: formData.files,
      };

      if (editIndex !== null) {
        setFolders(folders.map((folder, index) => (index === editIndex ? newObject : folder)));
      } else {
        setFolders([...folders, newObject]);
      }

      handleCloseModal();
    }
  };

  const handleEdit = (index: number) => {
    const folderToEdit = folders[index];
    setFormData({ name: folderToEdit.title, files: folderToEdit.files });
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    setIsConfirmDialogOpen(true);
    setFolderToDeleteIndex(index);
  };

  const confirmDelete = () => {
    if (folderToDeleteIndex !== null) {
      setFolders(folders.filter((_, i) => i !== folderToDeleteIndex));
      setFolderToDeleteIndex(null);
      setIsConfirmDialogOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsConfirmDialogOpen(false);
    setFolderToDeleteIndex(null);
  };

  const handleFolderClick = (folder: FolderData) => {
    setSelectedFolder(folder);
  };

  const handleCloseFolderModal = () => {
    setSelectedFolder(null);
  };

  const handleRemoveFileFromFolder = (fileIndex: number) => {
    if (selectedFolder) {
      const updatedFiles = selectedFolder.files.filter((_, index) => index !== fileIndex);
      const updatedFolder = { ...selectedFolder, files: updatedFiles, description: `Contains ${updatedFiles.length} ${updatedFiles.length > 1 ? 'files' : 'file'}.` };
      setSelectedFolder(updatedFolder);
      setFolders(folders.map(folder => folder.title === selectedFolder.title ? updatedFolder : folder));
    }
  };

  const handlePreviewFile = (file: File) => {
    if (isMobile) {
      const downloadUrl = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } else {
      setPreviewFile(file);
    }
  };

  const handleClosePreview = () => {
    setPreviewFile(null);
  };

  return (
    <section>
      <div className='py-5 flex flex-row gap-2 -mb-2 mt-5'>
        <Script />
        <div className='flex flex-col -mt-2'>
          <span className='text-2xl font-medium'>Scripts & Development</span>
          <span className='text-slate-500 text-xs'>You can find everything related to development here.</span>
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
        {folders.map((folder, index) => (
          <div key={index} className="relative w-full h-60 md:h-64 lg:h-64 shadow-md rounded-lg bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => handleFolderClick(folder)}>
            <div className="h-[80%] flex items-center justify-center">
              <FolderOpen className="text-blue-500 w-20 h-20" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[20%] bg-white flex items-center justify-between p-4 border-t border-gray-200">
              <div>
                <h3 className="font-medium">{folder.title}</h3>
                <span className="text-sm">{folder.description}</span>
              </div>
              <div className='flex space-x-2'>
                <button className="text-gray-500 hover:text-gray-700" onClick={(e) => { e.stopPropagation(); handleEdit(index); }}>
                  <Edit3 size={20} />
                </button>
                <button className="text-red-500" onClick={(e) => { e.stopPropagation(); handleDelete(index); }}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-8 rounded-lg shadow-xl w-96 max-h-full transform transition-transform duration-300'>
            <div className='flex justify-center pb-2 mb-4 border-b border-gray-200'>
              <h2 className='text-xl font-semibold'>{editIndex !== null ? 'Edit Object' : 'Create Object'}</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label className='block mb-2 text-sm font-medium'>
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4`}
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
                <label className='block mb-2 text-sm font-medium'>
                  Choose files <span className="text-red-500">*</span>
                </label>
                <div className="relative mb-4 border-2 border-dashed border-gray-300 rounded-lg py-10 text-center cursor-pointer hover:bg-gray-100">
                  <FolderOpen className="text-blue-500 w-10 h-10 mb-4 mx-auto" />
                  <label className="block text-sm text-slate-500 mb-2">
                    Drag and Upload Files or Click to Select
                  </label>
                  <input
                    type="file"
                    multiple
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                </div>
                {errors.files && (
                  <span className="text-red-500 text-sm">{errors.files}</span>
                )}
                <div className="grid grid-cols-3 gap-4">
                  {formData.files.map((file, index) => (
                    <div key={index} className="relative border p-2 rounded-md bg-gray-50 hover:shadow-md transition-shadow duration-200">
                      <span className="block text-xs truncate">{file.name}</span>
                      <button type="button" className="absolute top-1 right-1 text-red-500 hover:text-red-700" onClick={() => handleFileRemove(index)}>
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <footer className='pt-6 flex justify-end space-x-4 mt-4 border-gray-200'>
                <Button onClick={handleCloseModal} type="button" variant="outline">Cancel</Button>
                <Button type="submit">{editIndex !== null ? 'Save' : 'Create'}</Button>
              </footer>
            </form>
          </div>
        </div>
      )}

      {isConfirmDialogOpen && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-8 rounded-lg shadow-xl w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 max-h-full mx-2 sm:mx-4 md:mx-6 transform transition-transform duration-300'>
            <div className='flex justify-between items-center pb-2 mb-4 border-b border-gray-200'>
              <h2 className='text-xl font-semibold'>Confirm Deletion</h2>
              <button onClick={cancelDelete} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className='text-center mb-4'>
              <p>Warning: Deleting this folder is irreversible. Are you absolutely sure you want to proceed?</p>
            </div>
            <footer className='pt-6 flex justify-end space-x-4 mt-4 border-gray-200'>
              <Button onClick={cancelDelete} type="button" variant="outline">Cancel</Button>
              <Button onClick={confirmDelete} type="button" variant="destructive">Delete</Button>
            </footer>
          </div>
        </div>
      )}

      {
        selectedFolder && (
          <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50'>
            <div className='bg-white p-8 rounded-lg shadow-xl w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 max-h-full mx-2 sm:mx-4 md:mx-6 transform transition-transform duration-300'>
              <div className='flex justify-between items-center pb-2 mb-2 border-b border-gray-200'>
                <h2 className='text-lg md:text-xl font-semibold'>{selectedFolder.title} </h2>
                <button onClick={handleCloseFolderModal} className="text-gray-500 hover:text-gray-700">
                  <X size={24} className='text-2xl font-light' />
                </button>
              </div>
              <div className='flex-grow overflow-auto'>
                {selectedFolder.files.length === 0 ? (
                  <div className="py-10 text-center text-gray-500">The folder is empty. Please consider adding files.</div>
                ) : (
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
                    {selectedFolder.files.map((file, index) => (
                      <div key={index} className="relative border p-4 rounded-md bg-gray-50 hover:shadow-md transition-shadow duration-200 flex flex-col">
                        <div onClick={() => handlePreviewFile(file)}>
                          {file.type.startsWith('image/') ? (
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              width={200}
                              height={200}
                              className="rounded-md mb-2 cursor-pointer"
                            />
                          ) : (
                            <div className='text-sm text-gray-700 cursor-pointer'>{file.name}</div>
                          )}
                        </div>
                        <button
                          type="button"
                          className={`absolute ${file.type.startsWith('image/') ? 'bottom-1 right-1' : 'top-1/2 right-1 transform -translate-y-1/2'} text-red-500 hover:text-red-700`}
                          onClick={(e) => { e.stopPropagation(); handleRemoveFileFromFolder(index); }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }

      {previewFile && !isMobile && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 py-8'>
          <div className='bg-white p-6 rounded w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 h-full max-h-screen mx-auto flex flex-col'>
            <div className='flex justify-between items-center pb-2 mb-4'>
              <h2 className='text-lg md:text-xl font-medium'>{previewFile.name}</h2>
              <button onClick={handleClosePreview}>
                <X size={24} className='text-2xl font-light' />
              </button>
            </div>
            <div className='flex-grow overflow-auto'>
              {previewFile.type.startsWith('image/') ? (
                <div className='relative w-full h-full'>
                  <Image
                    src={URL.createObjectURL(previewFile)}
                    alt={previewFile.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
              ) : (
                <iframe src={URL.createObjectURL(previewFile)} className="w-full h-full border-0"></iframe>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ScriptsPage;