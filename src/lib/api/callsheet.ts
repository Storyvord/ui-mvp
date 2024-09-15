
import { CallSheet } from "@/app/(user-dashboard)/project-details/[id]/(planning)/call-sheets/types";
import { NEW_API_URL } from "@/constant/constant";
import Cookies from "js-cookie";


// Create a call sheet
export const createCallSheet = async (callSheetData: any) => {
    const token = Cookies.get("accessToken");
    console.log("Token:", token);
  console.log("CallSheetData:", callSheetData);

    const res = await fetch(`${NEW_API_URL}/api/callsheets/callsheets/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify(callSheetData),
    });
  
    if (!res.ok) {
      throw new Error("Failed to create call sheet");
    }
  
    return res.json();
  };
  
  // get call sheet data
  export const getCallSheet = async (callsheet_id: number) => {
    const token = Cookies.get("accessToken");
   const response = await fetch(`${NEW_API_URL}/api/callsheets/callsheets/${callsheet_id}/`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
   })
   if(!response.ok){
    throw new Error(`Network response was not ok. Status: ${response.status}`)
   }
 
  return response.json()
  }
  
  // Delete a call sheet
  export const deleteCallSheet = async (callSheet_id: number) => {
    const token = Cookies.get("accessToken");
    const res = await fetch(`${NEW_API_URL}/api/callsheets/callsheets/${callSheet_id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to delete call sheet. Status: ${res.status}`);
    }
  
    return res.json();
  };
  
  // Edit a call sheet
  export const editCallSheet = async ({callSheet_id, callSheet_data,}: {callSheet_id: number; callSheet_data: CallSheet;}) => {
    const token = Cookies.get("accessToken");
    const response = await fetch(`${NEW_API_URL}/api/callsheets/callsheets/${callSheet_id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(callSheet_data),
    });
  
    if (!response.ok) {
      throw new Error(`Failed to Update call sheet. Status: ${response.status}`);
    }
  
    return response.json();
  };
  