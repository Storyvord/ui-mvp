import { z } from "zod"

export const projectFormSchema = z.object({
    projectName: z.string().min(1, {message:"Project Name is required"}),
    contentType: z.string().min(1, {message:"Content Type is required"}),
    budget: z.number().min(5, {message:"Minimum budget is $5k"}).max(200000, {message:"Maximum budget is $200000k"}),
    description: z.string().min(1, {message:"Project description is required"}),
    additionalDetails: z.string().min(1, {message:"Additional details required"}),
    locationDetails: z.array(z.object({
      location: z.string().min(1, {message:"Location is required"}),
      start_date: z.string().date(),
      end_date: z.string().date(),
      mode_of_shooting: z.enum(["indoor", "outdoor", "both"], { errorMap: () => ({ message: 'Select a mode of shooting' }) }),
      permits: z.boolean(),
    }).refine((data)=>{
        const startDate = new Date(data.start_date);
        const endDate = new Date(data.end_date);
        return endDate >= startDate;
    }, {
        message: 'End date must be after start date',
        path: ['end_date'],  // This will attach the error to the endDate field
    }
    )),
    uploadedDocument: z.string() ,
    ai_suggestions: z.boolean(),
    crew: z.record(z.string(), z.number().min(1, { message: 'Value must be greater than 0' })),
        // .refine(crew => Object.keys(crew).length > 0, { message: 'At least one crew member is required' }),
    equipment: z.record(z.string(), z.number().min(1, { message: 'Value must be greater than 0' })),
    // .refine(eqmt => Object.keys(eqmt).length > 0, { message: 'At least one equipment is required' }),
  })

 export const taskFormSchema = z.object({
    title: z.string().min(1, {message:"Task title is required"}),
    desc: z.string().optional(),
    deadline: z.string().date(),
  })

  export const ClientProfileUpdateSchema =  z.object({
    address: z.string().min(1, "Address is required"),
    countryName: z.string().min(1, "Country name is required"),
    description: z.string().min(1, "Description is required"),
    firstName: z.string().min(1, "First name is required"),
    formalName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
    locality: z.string().min(1, "Locality is required"),
    personalWebsite: z.string().url("Invalid URL").optional(),
    role: z.string().min(1, "Role is required"),
  });
