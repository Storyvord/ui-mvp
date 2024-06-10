interface project{
    id:number
    name: string;
    start_date?:string;
    end_date?:string;
    budget?:string;
    location?:string;
    status:boolean;
} 

export type projectArray = project[];

type itemType = {
    text: string,
    link: string,
    icon: React.FC,
}

export type projectDetailItem = {
    title:string,
    items: itemType[],
}

export type calenderFormType = {
    title: string,
    start: string,
    end: string,
    desc? : string,
    location? : string,
    participants? : string[],
}

export type calenderEventType = {
    id: number,
    title: string,
    start: Date,
    end: Date,
    desc? : string,
    location? : string,
    participants? : string[],
}