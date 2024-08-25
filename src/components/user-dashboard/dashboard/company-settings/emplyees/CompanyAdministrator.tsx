"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { motion } from "framer-motion";
import AdministratorForm from "./AdministratorForm";
import { useFormData } from "@/context/AdministratorContext";
import { AdministratorFormData } from "./types";
import { Column, usePagination, useSortBy, useTable } from "react-table";
import { FaUsers } from "react-icons/fa";

const columns: Column<AdministratorFormData>[] = [
  { Header: "FirstName", accessor: "firstname" },
  { Header: "LastName", accessor: "lastname" },
  { Header: "Email", accessor: "email" },
  { Header: "Message", accessor: "message" },
];

const CompanyAdministrator = () => {
  const [modalSearch, setModalSearch] = useState(false);
  const [addmModalForm, setAddmModalForm] = useState(false);
  const { submittedData, setSubmittedData } = useFormData();

  const submitted = 0;
  console.log("Submitted Data:", submittedData);

  const handleClickModalSearch = () => {
    setModalSearch(!modalSearch);
  };

  const handleClickAddmModalForm = () => {
    setAddmModalForm(!addmModalForm);
  };

  const data = useMemo(() => (Array.isArray(submittedData) ? submittedData : []), [submittedData]);

  console.log("data:", data);

  useEffect(() => {
    const storedData = localStorage.getItem("adminFormData");
    if (storedData) {
      setSubmittedData(JSON.parse(storedData));
    }
  }, [setSubmittedData]);

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable<AdministratorFormData>(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 4 },
      },
      useSortBy,
      usePagination
    );

  console.log("Table Header Groups:", headerGroups);

  return (
    <div>
      <div className="mt-2">
        <h1 className="text-gray-500 md:text-xl text-lg font-medium">Company Administrators</h1>
        <div className="mt-4">
          <div className="flex md:flex-row flex-col items-start md:gap-0 gap-2 justify-between">
            <Button
              onClick={handleClickAddmModalForm}
              type="button"
              variant="outline"
              className="md:w-auto w-full flex items-center gap-2 hover:bg-gray-50 "
            >
              <FiPlus size={19} />
              Add Company Administrator
            </Button>

            <div className="md:w-auto w-full flex items-start gap-2 cursor-pointer">
              <div className="flex flex-col items-center">
                <div
                  onClick={handleClickModalSearch}
                  className="p-2 border border-gray-300 hover:bg-gray-50 bg-white rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
                >
                  <IoIosSearch size={18} />
                </div>
                <p className="text-[10px] mt-1 font-medium">Search</p>
              </div>
              {modalSearch && (
                <motion.input
                  type="search"
                  placeholder="Search"
                  className="w-full p-2 border border-gray-300 hover:bg-gray-50 bg-white rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                />
              )}
            </div>
          </div>

          <div className="mt-4">
            {addmModalForm && (
              <motion.div
                className="w-full border rounded-lg bg-white mb-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full p-6">
                  <AdministratorForm />
                </div>
              </motion.div>
            )}
          </div>

          <div>
            {submitted > 0 ? (
              <div className="w-full bg-white shadow-sm rounded-lg mt-6 md:overflow-hidden overflow-x-scroll border">
                <table {...getTableProps()} className="w-full table-auto">
                  <thead className="w-full bg-gray-50">
                    {headerGroups.map((hg, index) => (
                      <tr
                        {...hg.getHeaderGroupProps()}
                        key={index}
                        className="cursor-pointer w-full border-b"
                      >
                        {hg.headers.map((column) => (
                          <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            className="py-2 px-4 text-[17px] font-medium text-left"
                            key={column.id}
                          >
                            <div className="flex items-center gap-1">
                              {column.render("Header")}
                              {column.isSorted && (
                                <span>
                                  {column.isSortedDesc ? (
                                    <AiOutlineSortAscending />
                                  ) : (
                                    <AiOutlineSortDescending />
                                  )}
                                </span>
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()} className="w-full">
                    {page.map((row, index) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          key={index}
                          className="hover:bg-gray-50 cursor-default w-full border-b"
                        >
                          {row.cells.map((cell) => (
                            <td
                              {...cell.getCellProps()}
                              className="py-2 px-4 text-[15px]"
                              key={cell.column.id}
                            >
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className=" mb-4">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <FaUsers size={30} />
                    <p className="text-gray-500 md:text-[16px] text-[13px] text-center font-normal">
                      There are no Administrator linked with your company account yet.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAdministrator;
