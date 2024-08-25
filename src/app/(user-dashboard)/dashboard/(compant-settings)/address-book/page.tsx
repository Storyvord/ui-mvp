"use client";
import { Button } from "@/components/ui/button";
import AddressBookCard from "@/components/user-dashboard/dashboard/company-settings/AddressBook/AddressBookCard";
import AddressBookForm, {
  AddressBookFormType,
} from "@/components/user-dashboard/dashboard/company-settings/AddressBook/AddressBookForm";
import {
  useCreateAddressBook,
  useDeleteAddressBook,
  useGetAddressBook,
} from "@/lib/react-query/queriesAndMutations/company/addressBook";
import React, { useEffect, useState } from "react";

export type AddressBookForm = AddressBookFormType & {
  id: number;
  on_set: boolean;
  created_by: number;
};

const AddressBook = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState<{ id: number } | null>(null); // Safely handle user data

  useEffect(() => {
    // This ensures localStorage is only accessed in the browser
    const storedUser = localStorage.getItem("user-details");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const {
    data: addressBooks,
    isLoading: isLoadingGetAddressBook,
    isError: isErrorGetAddressBook,
  } = useGetAddressBook();
  const {
    mutateAsync,
    isLoading: isLoadingCreateAddressBook,
    isError: isErrorCreateAddressBook,
  } = useCreateAddressBook();

  const { mutateAsync: deleteAddressBook } = useDeleteAddressBook();

  const handleCreateAddressBook = async (data: AddressBookFormType) => {
    const transformData = { ...data, on_set: true, created_by: user?.id };
    const res = await mutateAsync(transformData);
    if (res) setOpenDialog(false);
  };

  const handleDeleAddressBook = async (id: number) => deleteAddressBook(id);

  return (
    <div className=" p-4">
      <Button onClick={() => setOpenDialog(true)}>Add</Button>
      <AddressBookForm
        createAddressBook={handleCreateAddressBook}
        isLoading={isLoadingCreateAddressBook}
        isError={isErrorCreateAddressBook}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />

      {isLoadingGetAddressBook && <p className=" mt-4 text-center">Loading...</p>}
      {isErrorGetAddressBook && (
        <p className=" mt-4 text-center text-red-600">Failed to get your address books</p>
      )}
      <div
        className="my-4 grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
      >
        {addressBooks?.length === 0 && (
          <h1 className=" mt-8 mx-auto w-full text-center text-xl">
            No contacts found, Create now
          </h1>
        )}
        {addressBooks?.map((item: AddressBookForm) => (
          <AddressBookCard deleteAddressBook={handleDeleAddressBook} key={item.id} contact={item} />
        ))}
      </div>
    </div>
  );
};

export default AddressBook;
