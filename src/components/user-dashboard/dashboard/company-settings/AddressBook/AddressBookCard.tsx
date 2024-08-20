import React from "react";
import { AddressBookForm } from "@/app/(user-dashboard)/dashboard/(compant-settings)/address-book/page";
import { MdDelete } from "react-icons/md";

type Props = { contact: AddressBookForm; deleteAddressBook: (id: number) => void };

const AddressBookCard = ({ contact, deleteAddressBook }: Props) => {
  const DeleteAddressBook = () => deleteAddressBook(contact.id);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <div className="mb-2 flex justify-between px-2">
        <h1 className="font-bold text-xl mb-2">{contact?.name}</h1>
        <MdDelete className=" w-6 -h-6 text-red-600 cursor-pointer" onClick={DeleteAddressBook} />
      </div>
      <p className="text-gray-700 text-base mb-2">
        <strong>Position:</strong> {contact?.positions}
      </p>
      <p className="text-gray-700 text-base mb-2">
        <strong>Email:</strong> {contact?.email}
      </p>
      <p className="text-gray-700 text-base mb-2">
        <strong>Secondary Email:</strong> {contact?.secondary_email}
      </p>
      <p className="text-gray-700 text-base mb-2">
        <strong>Office Phone:</strong> {contact?.phone_office}
      </p>
      <p className="text-gray-700 text-base mb-2">
        <strong>Work Phone:</strong> {contact?.phone_work}
      </p>
      <p className="text-gray-700 text-base mb-2">
        <strong>Home Phone:</strong> {contact?.phone_home}
      </p>
      <p className="text-gray-700 text-base mb-2">
        <strong>Private Phone:</strong> {contact?.phone_private}
      </p>
    </div>
  );
};

export default AddressBookCard;
