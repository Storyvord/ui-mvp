import { z, ZodObject, ZodTypeAny } from "zod"

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

export const projectFormSchema = z.object({
    projectName: z.string().min(1, {message:"required"}),
    contentType: z.string().min(1, {message:"required"}),
    otherContent: z.string().optional(),
    budget: z.number(),
    crew: z.array(z.object({
      type: z.string(),
      count: z.number(),
    })),
    // equipment: z.array(z.object({
    //   type: z.string(),
    //   count: z.number(),
    // })),
    description: z.string(),
    additional_details: z.string().optional(),
    locationDetails: z.array(z.object({
      location: z.string(),
      start_date: z.string().date(),
      end_date: z.string().date(),
      mode: z.enum(["indoor", "outdoor", "both"]),
      filming_permits: z.boolean(),
    })),
    ai_suggestions: z.boolean(),
    // crew2: z.object({}).catchall(z.string().nonempty("Field is required")),
  })

 
  
  export type projectFormInputType = z.infer<typeof projectFormSchema>