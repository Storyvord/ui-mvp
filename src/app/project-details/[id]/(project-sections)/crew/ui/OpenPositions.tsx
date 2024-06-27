import React, { useState, FormEvent } from 'react';
interface Position {
  positionName: string;
  displayName: string;
  department: string;
  onSet: boolean;
  description: string;
  id: number;
}

const OpenPositions: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [activePositionId, setActivePositionId] = useState<number | null>(null);
  const [isImage1, setIsImage1] = useState(false);
  const [isImage2, setIsImage2] = useState(false);

  const [isImage3, setIsImage3] = useState(false);
  const [isImage4, setIsImage4] = useState(false);



  const handleAddPositionClick = () => {
    setIsFormOpen(true);
    setActivePositionId(null); // Reset active position
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPosition: Position = {
      positionName: formData.get('positionSelect') as string,
      displayName: formData.get('displayName') as string,
      department: formData.get('departmentSelect') as string,
      onSet: isChecked,
      description: formData.get('description') as string,
      id: Date.now(), // Unique ID for each position
    };
    setPositions([...positions, newPosition]);
    setIsFormOpen(false); // Close the form after submission
    setActivePositionId(newPosition.id); // Display the new position details
  };

  const handleBackClick = () => {
    setIsFormOpen(false);
    setActivePositionId(null); // Reset active position
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleShowPositionClick = (id: number) => {
    setActivePositionId(id); // Set active position to display its details
  };

  const handleImageChange = () => {
    setIsImage1(!isImage1);
  };
  const handleImageChange2 = () => {
    setIsImage2(!isImage2);
  };
  const handleImageChange3 = () => {
    setIsImage3(!isImage3);
  };
  const handleImageChange4 = () => {
    setIsImage4(!isImage4);
  };


  return (
    <div>
      {!isFormOpen && activePositionId === null && (
        <div>
          <div className="w-full h-auto border-[1.1px] border-gray-300 flex px-4 pt-2 rounded-sm text-gray-700">
            <div>ⓘ</div> &#160; With open positions you can suggest crew members for each position you need to fill. Only users with edit access to the crew section will see this information.
          </div>
          {positions.length === 0 ? (
            <div className="w-full h-auto p-[50px] border-[1.1px] mt-[50px] border-gray-300 flex rounded-sm flex-col items-center justify-center">
              <img src="https://cdn-icons-png.flaticon.com/128/2915/2915423.png" alt="" className='w-[50px] h-[50px]' />
              <p>There are no open positions yet.</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 w-[200px] text-white font-bold py-2 m-2 rounded-sm"
                onClick={handleAddPositionClick}
              >
                + Add open position
              </button>
            </div>
          ) : (
            <div className="w-full h-auto p-[50px] mt-[20px] border-[1.1px] border-gray-300 rounded-sm">
              <button
                className="bg-blue-500 hover:bg-blue-700 w-[200px] text-white font-bold py-2 m-2 rounded-sm"
                onClick={handleAddPositionClick}
              >
                + Add open position
              </button>
            </div>
          )}
        </div>
      )}
      
      {isFormOpen && (
        <div className="bg-white border-[1.1px] border-gray-300 rounded-md">
          <h1 className="h-[80px] border-[1.1px] border-gray-300 text-2xl flex items-center justify-between px-5 w-full rounded-t-md text-gray-600">
            <div>Add Open Position ⓘ</div>
            <div onClick={handleBackClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/2997/2997911.png"
                alt=""
                className="w-[20px] h-[20px]"
              />
            </div>
          </h1>

          <div className="">
            <div className="overflow-y-auto h-[300px]">
              <form onSubmit={handleFormSubmit}>
                <label className="flex flex-col my-3 mx-5 text-gray-600">
                  Position Name
                  <select
                    name="positionSelect"
                    required
                    className="h-10 rounded-sm border-[1.1px] border-gray-300"
                  >
                    <option value="">Select an option</option>
                    <option value="ADMINISTRATORS">ADMINISTRATORS</option>
                    <option value="Project administrator">Project administrator</option>
                    <option value="PRODUCTION">PRODUCTION</option>
                    <option value="Producer">Producer</option>
                    <option value="Co-Producer">Co-Producer</option>
                  </select>
                </label>
                <br />
                <label className="flex flex-col my-3 mx-5 text-gray-600">
                  Display position with the following name (required)
                  <input
                    type="text"
                    name="displayName"
                    required
                    className="h-10 rounded-sm border-[1.1px] border-gray-300 "
                  />
                </label>
                <br />
                <label className="flex flex-col my-3 mx-5 text-gray-600">
                  Department
                  <select
                    name="departmentSelect"
                    required
                    className="h-10 rounded-sm border-[1.1px] border-gray-300"
                  >  
                    <option value="" >Select an option</option>
                    <option value="All">All</option>
                    <option value="Administrators">Administrators</option>
                    <option value="Production">Production</option>
                    <option value="Misc.">Misc.</option>
                  </select>
                </label>
                <br />
                    
                <div className="flex items-center mx-5 ">
                  <input
                    type="checkbox"
                    id="my-checkbox"
                    style={{ height: '20px', width: '20px' }}
                    className="form-checkbox h-6 w-6 text-blue-600"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="my-checkbox" className="ml-1 text-gray-600">
                    On set
                  </label>
                </div>

                <br />
                <label className="flex flex-col my-3 mx-5 text-gray-600 ">
                  Note
                  <textarea
                    name="description"
                    required
                    className="h-40 rounded-none border-[1.1px] border-gray-300 "
                  />
                </label>
                <br />

                <div className="flex justify-between mx-5">
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 w-[100px] text-white font-bold py-2 m-2 rounded-sm"
                    onClick={handleBackClick}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 w-[100px] text-white font-bold py-2 m-2 rounded-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
         
      {activePositionId !== null && !isFormOpen && (
        <div className="mt-5 p-5 border-[1.1px] border-gray-300 rounded-md">
          {positions.map((position) => (
            position.id === activePositionId && (
              <div className=' flex justify-between'>
                      <div className=' w-[40%] flex flex-col items-center  '>

                                <div className='border-[1.1px] border-gray-300 w-[80%] h-[200px] rounded-md flex justify-center items-center'> <img src="https://cdn-icons-png.flaticon.com/128/2984/2984971.png" alt="" /> </div>
                                    <div><h1 className='text-[25px] font-bold'>  {position.positionName} </h1> <p className='text-gray-400'>not assigned yet</p></div>
                                <div className=" w-[80%] h-[70px] mt-2 flex ">
                                     <div className=" w-[50px] mr-3 flex flex-col items-center "><img src="https://cdn-icons-png.flaticon.com/128/11526/11526855.png" alt="" className='w-10 h-10 border-[1.1px] border-gray-300 p-3 rounded-md'/>   <div className="text-[10px]">Mark</div>   </div>
                                     <div className=" w-[50px] mr-3 flex flex-col items-center "><img src="https://cdn-icons-png.flaticon.com/128/593/593374.png" alt="" className='w-10 h-10 border-[1.1px] border-gray-300 p-2 rounded-md'/>   <div className="text-[10px] text-center">Item seen by</div>   </div>
                                     <div className=" w-[50px] mr-3 flex flex-col items-center "><img src="https://cdn-icons-png.flaticon.com/128/10065/10065140.png" alt="" className='w-10 h-10 border-[1.1px] border-gray-300 p-3 rounded-md'/>   <div className="text-[10px]">Delete</div>   </div>
                                </div>

                      </div>
              <div className=' border-blue-500 w-[60%] h-fit p-3 rounded-sm '> 
                   
           <div key={position.id} className={` ${isImage1 ? 'h-[400px]' : 'h-[50px]'}  rounded-md   `}>
            <div className="   h-[50px] px-2 flex items-center justify-between  rounded-sm  bg-gray-200"> <h3 className="text-xl font-bold ">General Information</h3>  <img  src={isImage1 ? 'https://cdn-icons-png.flaticon.com/128/3106/3106683.png' : 'https://cdn-icons-png.flaticon.com/128/2985/2985150.png'} alt=""  className='h-[20px] w-[20px] m-4'  onClick={handleImageChange}/></div>
               
                 <div className={`relative ${isImage1 ? 'flex-col' : 'hidden'} `}>
                <p><strong>Display Name: <br /> </strong>  {position.positionName}</p>
                {/* <p><strong>Department:</strong> {position.department}</p> */}
                <p><strong>Description: <br /></strong> {position.description} </p>
                <p><strong>On Set: <br /></strong > {position.onSet ? 'Yes' : 'No'}</p>
                </div>
                    <div className={`w-full  h-36 border-[1.1px] border-gray-400 mt-3 p-2 text-[20px]   ${isImage1 ? 'flex-col' : 'hidden'}`}>Access rights after invitation ⓘ </div>
              </div>

              {/* Crew suggestions */}
               <div key={position.id} className={` my-2 ${isImage2 ? 'h-[300px]' : 'h-[50px]'} rounded-sm   `}>
               <div className=" h-[50px] px-2 bg-gray-200  flex items-center justify-between  rounded-sm  z-10"> <h3 className="text-xl font-bold">Crew suggestions</h3>  <img  src={isImage2 ? 'https://cdn-icons-png.flaticon.com/128/3106/3106683.png' : 'https://cdn-icons-png.flaticon.com/128/2985/2985150.png'} alt=""  className='h-[20px] w-[20px] m-4'  onClick={handleImageChange2}/></div>
               <div className={`relative ${isImage2 ? 'flex-col' : 'hidden'}  flex flex-col justify-center items-center  h-full `}>
                  <div className='my-2'><img src="https://cdn-icons-png.flaticon.com/128/3085/3085481.png" alt="" className='w-[50px] h-[50px]' /></div>
                    <p className='m-2'>No external contacts have been added yet.</p>
               <button  className="bg-blue-700 w-60 h-10 text-white flex items-center justify-center mx-2 rounded-sm text-[15px] my-2">+ Suggest external contact </button>

              </div>

               </div>
               {/* My created tasks */}
               <div key={position.id} className={` my-2 ${isImage3 ? 'h-[300px]' : 'h-[50px]'} rounded-sm `}>
               <div className="h-[50px]  px-2 bg-gray-200  flex items-center justify-between  rounded-sm  z-10"> <h3 className="text-xl font-bold">My created tasks</h3>  <img  src={isImage3 ? 'https://cdn-icons-png.flaticon.com/128/3106/3106683.png' : 'https://cdn-icons-png.flaticon.com/128/2985/2985150.png'} alt=""  className='h-[20px] w-[20px] m-4'  onClick={handleImageChange3}/></div>
               <div className={`relative ${isImage3 ? 'flex-col' : 'hidden'} flex flex-col justify-center items-center  h-full  `}>
               <div className='my-2'><img src="https://cdn-icons-png.flaticon.com/128/7997/7997870.png" alt="" className='w-[50px] h-[50px] relative -top-2' /></div>
                    <p className='m-2 relative -top-2'>There are no tasks available.</p>
               <button  className="bg-blue-700 w-36 h-10 text-white flex items-center justify-center mx-2 rounded-sm text-[15px] my-2 relative -top-2 ">+ Create task </button>

              </div>
               </div>

               {/* comments */}
               <div key={position.id} className={` my-2 ${isImage4 ? 'h-[300px]' : 'h-[50px]'} rounded-sm  `}>
               <div className=" h-[50px] px-2 bg-gray-200   flex items-center justify-between  rounded-sm  z-10"> <h3 className="text-xl font-bold">Comments</h3>  <img  src={isImage4 ? 'https://cdn-icons-png.flaticon.com/128/3106/3106683.png' : 'https://cdn-icons-png.flaticon.com/128/2985/2985150.png'} alt=""  className='h-[20px] w-[20px] m-4'  onClick={handleImageChange4}/></div>
               <div className={`relative ${isImage4 ? 'flex-col' : 'hidden'} flex flex-col justify-center items-center  h-full  `}>
               <div className='my-2'><img src="https://cdn-icons-png.flaticon.com/128/11198/11198445.png" alt="" className='w-[50px] h-[50px] relative -top-2' /></div>
                    <p className='m-2 relative -top-2'>There are no comments yet.</p>
               <button  className="bg-blue-700 w-36 h-10 text-white flex items-center justify-center mx-2 rounded-sm text-[15px] my-2 relative -top-2 ">+ Wrtie Comments </button>

              </div>
               </div>

              </div>
              </div>
                   
            )
          ))}
          <button 
            className="mt-4 bg-gray-500 hover:bg-gray-700 w-[100px] text-white font-bold py-2 rounded-sm" 
            onClick={() => setActivePositionId(null)}
          >
            Back
          </button>
        </div>
      )}

      {positions.length > 0 && activePositionId === null && !isFormOpen && (
        positions.map((position) => (
          <div key={position.id}>
            <div 
              className="mt-5 py-0 border-[1.1px] border-gray-300 rounded-md cursor-pointer flex items-center h-[55px] justify-between "  
              onClick={() => handleShowPositionClick(position.id)}>  
              <div className=' flex'>
             <div className="flex items-center justify-center border-[1.1px] border-gray-300 relative h-[55px] w-[50px]"><img src="https://cdn-icons-png.flaticon.com/128/471/471664.png" alt=""  className='h-[20px] w-[20px] flex  '/></div>
              <h3 className="text-xl font-bold flex items-center justify-cente mx-2">{position.positionName}</h3>
              </div>
              <div className="  h-[65px] flex items-center justify-center  rounded-e-md"><img src="https://cdn-icons-png.flaticon.com/128/8212/8212730.png" alt="" className='h-[35px] w-[35px] '  /></div>

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OpenPositions;
