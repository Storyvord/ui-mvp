"use client";

import React, { useEffect, useState } from 'react';
import Header from './Header';

import { useToast } from "@/components/ui/use-toast";
import MainContainer from './MainContainer';
import { CreateResourceType } from '../type';

const Resources: React.FC = () => {
  const [list, setList] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState<CreateResourceType[]>([]);

  const handleClickListView = () => {
    setList(!list);
  };

  const handleFormVisible = () => {
    setIsFormVisible(!isFormVisible);
  };

  const { toast } = useToast();

  const onSubmit = (data: CreateResourceType) => {
    const updatedData = [data]; 
    localStorage.setItem("resourceFormData", JSON.stringify(updatedData));
    setSubmittedData(updatedData); 
    toast({
      title: "Form submitted",
      description: "Your form data has been submitted successfully.",
    });
    setIsFormVisible(false);
  };

  const handleDelete = () => {
    localStorage.removeItem("resourceFormData");
    setSubmittedData([]);
    toast({
      title: "Data Deleted",
      description: "Your form data has been deleted successfully.",
    });
  };

  
  useEffect(() => {
    const storedData = localStorage.getItem("resourceFormData");
    if (storedData) {
      setSubmittedData(JSON.parse(storedData) || []);
    }
  }, []);

  return (
    <div className='flex flex-col p-6'>
      <Header 
        list={list} 
        handleClickListView={handleClickListView} 
        isFormVisible={isFormVisible} 
        setIsFormVisible={setIsFormVisible} 
        handleFormVisible={handleFormVisible} 
        onSubmit={onSubmit}
      />
      <MainContainer list={list} submittedData={submittedData} handleDelete={ handleDelete} />
    </div>
  );
}


export default Resources;
