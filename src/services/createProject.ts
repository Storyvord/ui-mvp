import { projectFormInputType } from "@/lib/types";
const api = 'https://sv-aibackend.azurewebsites.net/api/crew/create-project/'
export const createProject = async (formData: projectFormInputType) =>{
    console.log(JSON.stringify(formData))
    const res = await fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            
        },
        body: JSON.stringify(formData),
    })

    console.log(await res.text())

    if (!res.ok) {
        throw new Error('Failed to create project');
      }
    
      return res.json();
}