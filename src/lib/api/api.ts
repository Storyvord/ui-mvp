import { projectFormInputType } from "@/types";
import { API_URL } from "@/utils/constant";

export const createProject = async (formData: projectFormInputType) =>{
    const res = await fetch(`${API_URL}/api/project/create-project/`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json', 
        },
        body: JSON.stringify(formData),
    })

    if (!res.ok) {
        throw new Error('Failed to create project');
      }
    
      return res.json();
}

export const fetchProjectDetails = async ( {project_id}: {  project_id: string }) => {
    const res = await fetch(`${API_URL}/api/project/complete-project-details/?project_id=${project_id}`)
    if (!res.ok) {
        throw new Error('Failed to fetch project details');
    }
    
    return  res.json();
}


export const fetchLocation = async ( params: { search: string, page: number }) => {
    const { search, page } = params;
        const apiKey = process.env.NEXT_PUBLIC_LOCATION_API_KEY;
    const res = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${search}&page=${page}&limit=10`, // Adjust pagination parameters as required
      {
        headers: {
          'x-rapidapi-key': `${apiKey}`, // Replace with your RapidAPI key
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        },
      }
    );
    
    if (!res.ok) {
      throw new Error('Failed to fetch location');
    }

  
    return  res.json();
  };