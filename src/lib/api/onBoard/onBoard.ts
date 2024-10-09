import { NEW_API_URL_V2 } from "@/constant/constant";
import Cookies from "js-cookie";

export const postUserType = async (user_type: string) => {
    const token = Cookies.get("accessToken");
    const res = await fetch(`${NEW_API_URL_V2}/accounts/v2/usertype/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({user_type}),
    });
    if (!res.ok) {
        const errorData = await res.json(); // Extract error message from response
        throw new Error(errorData?.user_type[0]);
    }
    return res.json();
};

export const postPersonalDetails = async (data: any) => {
    const token = Cookies.get("accessToken");
    const res = await fetch(`${NEW_API_URL_V2}/accounts/v2/saveprofile/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json(); // Extract error message from response
        throw new Error(errorData?.user_type[0]);
    }
    return res.json();
};