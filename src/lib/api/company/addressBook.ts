import { AddressBookFormType } from "@/components/user-dashboard/dashboard/company-settings/AddressBook/AddressBookForm";
import { USER_API } from "@/constant/constant";
import Cookies from "js-cookie";

export const getAddressBook = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/company/address-book/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch address book");
  }
  return res.json();
};

export const createAddressBook = async (data: AddressBookFormType) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/company/address-book/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create address book");
  }

  return res.json();
};

export const deleteAddressBook = async (id: number | null) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/company/address-book/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete company calender event");
  }
};
