"use client";

import React, { useEffect, useState } from 'react'
import Header from './Header'
import MainContainer from './MainContainer'
import { CreateBookingType } from '../type';
import { useToast } from '@/components/ui/use-toast';

const Bookings = () => { 
  const [list, setList] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState<CreateBookingType[]>([]);
  
  const { toast } = useToast(); 

  const handleFormVisible = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleClickListView = () => {
    setList(!list);
  };


  const onSubmit = (data: CreateBookingType) => {
    const updatedData = [data]; 
    localStorage.setItem("bookingFormData", JSON.stringify(updatedData));
    setSubmittedData(updatedData); 
    toast({
      title: "Form submitted",
      description: "Your form data has been submitted successfully.",
    });
    setIsFormVisible(false);
  };

  const handleDelete = () => {
    localStorage.removeItem("bookingFormData");
    setSubmittedData([]);
    toast({
      title: "Data Deleted",
      description: "Your form data has been deleted successfully.",
    });
  };

  useEffect(() => {
    const storedData = localStorage.getItem("bookingFormData");
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
      <MainContainer list={list} submittedData={submittedData} handleDelete={ handleDelete}/>
    </div>
  )
}

export default Bookings
