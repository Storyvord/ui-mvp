import React, { useState, FormEvent } from 'react';

interface Position {
  positionName: string;
  description: string;
  id: number;
}

const OpenPositions: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [activePositionId, setActivePositionId] = useState<number | null>(null);

  const handleAddPositionClick = () => {
    setIsFormOpen(true);
    setActivePositionId(null); // Reset active position
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPosition: Position = {
      positionName: formData.get('displayName') as string,
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
<option value="position">ADMINISTRATORS</option>
<option value="position">Project administrator</option>
<option value="position">PRODUCTION</option>
<option value="position">Producer</option>
<option value="position">Co-Producer</option>


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
                    <option value="department1">All</option>
                    <option value="department2">Administrators</option>
                    <option value="department3">Production</option>
                    <option value="department3">Misc.</option>
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
          //  form details
        <div className="mt-5 p-5 border-[1.1px] border-gray-300 rounded-md">
          {positions.map((position) => (
            position.id === activePositionId && (
              <div key={position.id}>
                <h3 className="text-xl font-bold">Project admisitrator</h3>
                <p><strong>Position Name:</strong> {position.positionName}</p>
                <p><strong>Description:</strong> {position.description}</p>
                <p><strong>Description:</strong> {position.description}</p>


                <div>Hellooooooooooo</div>
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
              className="mt-5 p-5 border-[1.1px] border-gray-300 rounded-md cursor-pointer" 
              onClick={() => handleShowPositionClick(position.id)}
            >
              
              <h3 className="text-xl font-bold">{position.positionName}</h3>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OpenPositions;
