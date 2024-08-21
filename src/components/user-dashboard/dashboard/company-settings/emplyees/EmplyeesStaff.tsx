"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import EmplyeesForm from "./EmplyessForm";
import { Column, usePagination, useSortBy, useTable } from "react-table";
import { EmplyeesFormData } from "./types";
import { useFormData } from "@/context/AdministratorContext";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

const columns: Column<EmplyeesFormData>[] = [
  { Header: "FirstName", accessor: "firstname" },
  { Header: "LastName", accessor: "lastname" },
  { Header: "Email", accessor: "email" },
  { Header: "Positions", accessor: "positions" },
  { Header: "Message", accessor: "message" },
];

const EmplyeesStaff = () => {
  const [emplyModalForm, setEmplyModalForm] = useState(false);
  const { submittedData, setSubmittedData } = useFormData();

  const submitted = 0;
  const handleClickEmplyModalForm = () => {
    setEmplyModalForm(!emplyModalForm);
  };

  const data = useMemo(() => (Array.isArray(submittedData) ? submittedData : []), [submittedData]);

  console.log("data:", data);

  useEffect(() => {
    const storedData = localStorage.getItem("emplyeesFormData");
    if (storedData) {
      setSubmittedData(JSON.parse(storedData));
    }
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable<EmplyeesFormData>(
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
      <div>
        <h1 className="text-gray-500 md:text-xl text-lg font-medium pb-4">Employees & Staff</h1>
        <div>
          {emplyModalForm && (
            <motion.div
              className="w-full border rounded-lg bg-white mb-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full p-6">
                <EmplyeesForm />
              </div>
            </motion.div>
          )}
        </div>

        <div>
          {submitted > 0 ? (
            <div className="w-full bg-white shadow-sm rounded-lg mt-6 md:overflow-hidden overflow-x-scroll border">
              <table {...getTableProps()} className="w-full table-auto">
                <thead className="w-full bg-gray-50">
                  {headerGroups.map((hg) => (
                    <tr {...hg.getHeaderGroupProps()} className="cursor-pointer w-full border-b">
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
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
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
            <div>
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex flex-col items-center justify-center gap-4">
                  <FaUsers size={30} />
                  <p className="text-gray-500 md:text-[16px] text-[13px] text-center font-normal">
                    There are no employees / staff members linked with your company account yet.
                  </p>
                  <button
                    onClick={handleClickEmplyModalForm}
                    type="button"
                    className="md:w-auto w-full flex text-[15px] items-center gap-2 px-3 bg-white hover:bg-gray-50 border border-gray-300 p-2 rounded-lg"
                  >
                    <FiPlus size={19} />
                    Add Employee / Staff Member
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmplyeesStaff;
