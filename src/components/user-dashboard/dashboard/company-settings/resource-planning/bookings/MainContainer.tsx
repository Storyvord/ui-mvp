import React, { useState } from "react";
import { IoVideocamOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { LiaImage } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CreateBookingType } from "../type";

type HeaderProps = {
  list: boolean;
  submittedData: CreateBookingType[];
  handleDelete: () => void;
};

const MainContainer: React.FC<HeaderProps> = ({ list, submittedData = [], handleDelete }) => {
  const [isModalShow, setIsModalShow] = useState(false);

  const handleClickModal = () => {
    setIsModalShow(!isModalShow);
  };

  console.log(submittedData);

  return (
    <div className="mt-4">
      <>
        {list ? (
          <div className="flex flex-wrap gap-4">
            {submittedData.length > 0 ? (
              submittedData.map((item: CreateBookingType) => (
                <div
                  key={item.id}
                  className="bg-white w-[370px]  h-[150px] shadow-md p-4 rounded-md flex flex-col"
                >
                  <div
                    onClick={handleClickModal}
                    className="flex items-end justify-end cursor-pointer relative"
                  >
                    <CiMenuKebab size={18} />
                    <div className="absolute top-0 right-4">
                      {isModalShow && (
                        <div className="bg-white p-2 w-[190px] border shadow-xl rounded-md flex flex-col gap-2">
                          <div className="flex items-center hover:bg-gray-50 px-2 py-2 rounded-md gap-3">
                            <LiaImage size={18} />
                            <p className="text-[13px] text-gray-400 hover:text-gray-500 font-semibold">
                              Change icon
                            </p>
                          </div>
                          <div
                            onClick={handleDelete}
                            className="flex items-center hover:bg-red-50 px-2 py-2 rounded-md text-red-600 gap-3"
                          >
                            <RiDeleteBin6Line size={18} />
                            <p className="text-[13px] text-red-400 hover:text-red-600 font-semibold">
                              Delete element
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col gap-3 items-start px-2">
                      <IoVideocamOutline size={28} />
                      <div className="flex flex-col gap-2 items-start">
                        <h2 className="text-lg font-medium text-gray-600">{item.name}</h2>
                        <div className="md:w-[310px] w-[300px]  h-auto relative group">
                          <p
                            className={`text-sm text-gray-500 ${
                              item.company.length > 100
                                ? "truncate group-hover:whitespace-normal transition-all duration-300 group-hover:bg-white group-hover:rounded-lg group-hover:shadow-lg group-hover:p-4"
                                : ""
                            }`}
                          >
                            {item.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="border bg-white w-full h-[100px] flex items-center justify-center">
                <p className="text-center text-[20px] text-gray-400">
                  There are no Resource categories yet!
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-2">
            {submittedData.length > 0 ? (
              submittedData.map((item: CreateBookingType) => (
                <div
                  key={item.id}
                  className="bg-white w-full h-[60px] border shadow-sm rounded-md flex items-center"
                >
                  <div className="bg-gray-100 h-full w-[90px] border-r flex items-center justify-center">
                    <IoVideocamOutline size={28} />
                  </div>
                  <div className="flex items-center justify-between w-full px-4">
                    <div className="flex flex-col items-start">
                      <h2 className="text-[17px] font-medium text-gray-600">{item.name}</h2>
                      <p className="text-[12px] text-gray-500">{item.company}</p>
                    </div>
                    <div
                      onClick={handleClickModal}
                      className="flex items-end justify-end cursor-pointer relative"
                    >
                      <CiMenuKebab size={18} />
                      <div className="absolute top-0 right-4">
                        {isModalShow && (
                          <div className="bg-white p-2 w-[190px] border shadow-xl rounded-md flex flex-col gap-2">
                            <div className="flex items-center hover:bg-gray-50 px-2 py-2 rounded-md gap-3">
                              <LiaImage size={18} />
                              <p className="text-[13px] text-gray-400 hover:text-gray-500 font-semibold">
                                Change icon
                              </p>
                            </div>
                            <div
                              onClick={handleDelete}
                              className="flex items-center hover:bg-red-50 px-2 py-2 rounded-md text-red-600 gap-3"
                            >
                              <RiDeleteBin6Line size={18} />
                              <p className="text-[13px] font-semibold text-red-400 hover:text-red-600">
                                Delete element
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="border bg-white w-full h-[100px] flex items-center justify-center">
                <p className="text-center text-[20px] text-gray-400">
                  There are no Resource categories yet!
                </p>
              </div>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default MainContainer;
