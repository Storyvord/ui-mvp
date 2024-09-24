import { AddressBookFormType } from "@/components/user-dashboard/dashboard/company-settings/AddressBook/AddressBookForm";
import { USER_API } from "@/constant/constant";
import { customFetch } from "../api";

export const getAddressBook = async () => {
  return customFetch(`${USER_API}/api/company/address-book/`, {
    method: "GET",
  });
};

export const createAddressBook = async (data: AddressBookFormType) => {
  return customFetch(`${USER_API}/api/company/address-book/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deleteAddressBook = async (id: number | null) => {
  return customFetch(`${USER_API}/api/company/address-book/${id}/`, {
    method: "DELETE",
  });
};
