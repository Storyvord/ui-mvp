import { ReactElement } from "react";

export interface CreateResourceType{
    id: number
    name: string;
    description: string;
    category: string;
    icon:ReactElement | null
}

export interface CreateBookingType{
    id: number
    name: string;
    company: string;
    start: string;
    end: string;
    time:string;
    note:string
}