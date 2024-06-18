import { Report, File, Tasks, Announcements,
    Crew, Suppliers, Compliance, Budget, CallSheet, Calender,
    Script,
    Scenes,
    Shots,
    Storyboard,
    ContentItems,
    Cast,
    Costumes,
    Makeup,
    Locations,
    Production,
 } from '../components/sidebar/components/Sidebaricons'
import { calenderEventType, projectArray } from '../types'
import { projectDetailItem } from '../types'
import moment from 'moment'

export const API_KEY = 'https://sv-aibackend.azurewebsites.net';

export const projects:projectArray = [
    {
        id: 1,
        name:"Bruce Lee:The Man and the Legend",
        start_date:"",
        end_date:"",
        budget:"",
        location:"",
        status:false,
    },
    {
        id:2, 
        name:"Til Madness Do Us Part",
        start_date:"",
        end_date:"",
        budget:"",
        location:"",
        status: false,
    },
    {
        id: 3, 
        name:"Sakura Dreams: A Journey Through Japan's Contrasting Culture",
        start_date:"",
        end_date:"",
        budget:"",
        location:"",
        status:false,
    },
    {
        id: 4, 
        name: "The Secret Garden",
        start_date: "2024-06-01",
        end_date: "2024-09-30",
        budget: "$50,000,000",
        location: "England",
        status: true
    },
    {
        id: 5,
        name: "Inception",
        start_date: "2024-03-15",
        end_date: "2024-08-30",
        budget: "$160,000,000",
        location: "United States",
        status: true
    },
    {
        id: 6,
        name: "Avatar 2",
        start_date: "2024-10-01",
        end_date: "2025-03-31",
        budget: "$300,000,000",
        location: "New Zealand",
        status: true
    },
    {
        id: 7,
        name: "Jurassic World: Dominion",
        start_date: "2023-07-01",
        end_date: "2024-05-30",
        budget: "$200,000,000",
        location: "United Kingdom",
        status: true
    },
    {
        id: 8,
        name: "Wonder Woman 3",
        start_date: "2025-01-15",
        end_date: "2025-06-30",
        budget: "$120,000,000",
        location: "United States",
        status: true
    }    
]


export const projectdetailsItems: projectDetailItem[] = [
    {
        title: "general",
        items: [
            {
                text: "reports",
                link: "reports",
                icon: Report,
            },
            {
                text: "File & Documents",
                link: "file-documents",
                icon: File,
            },
            {
                text: "tasks",
                link: "task",
                icon: Tasks,
            },
            {
                text: "announcements",
                link: "announcements",
                icon: Announcements,
            }
        ]
    },
    {
        title: "planning",
        items: [
            {
                text: "crew",
                link: "crew",
                icon: Crew,
            },
            {
                text: "suppliers",
                link: "resource",
                icon: Suppliers,
            },
            {
                text: "compliance",
                link: "compliance",
                icon: Compliance,
            },
            {
                text: "budget",
                link: "budget",
                icon: Budget,
            },
            {
                text: "call sheets",
                link: "call-sheets",
                icon: CallSheet,
            },
            {
                text: "calender",
                link: "calender",
                icon: Calender,
            }
        ]
    },
    {
        title: "breakdowns & more",
        items: [
            {
                text: "script",
                link: "script",
                icon: Script,
            },
            {
                text: "scenes",
                link: "scenes",
                icon: Scenes,
            },
            {
                text: "shots",
                link: "shots",
                icon: Shots,
            },
            {
                text: "storyboard",
                link: "storyboard",
                icon: Storyboard,
            },
            {
                text: "content items",
                link: "content-items",
                icon: ContentItems,
            }
        ]
    },
    {
        title: "department specific",
        items: [
            {
                text: "cast",
                link: "cast",
                icon: Cast,
            },
            {
                text: "costumes",
                link: "costumes",
                icon: Costumes,
            },
            {
                text: "makeup & hair",
                link: "makeup-hair",
                icon: Makeup,
            },
            {
                text: "locations & sets",
                link: "locations-sets",
                icon: Locations,
            },
            {
                text: "production design",
                link: "production-design",
                icon: Production,
            }
        ]
    },
    
]

export const eventList: calenderEventType[] = [
    {
        id: 0,
        start:  moment('2024-06-06T08:00:00').toDate(),
        end: moment('2024-06-06T11:00:00').toDate(),
        title: 'Shooting',
    }
]

export const content_type = [
    {
        value: "Events", label: "Events"
    },
    {
        value: "People Stories", label: "People Stories"
    },
    {
        value: "Animation", label: "Animation"
    },
    {
        value: "Company News", label: "Company News"
    },
    { "value": "Company Stories", "label": "Company Stories" },
    { "value": "Case Studies", "label": "Case Studies" },
    { "value": "Interviews", "label": "Interviews" },
    { "value": "Tutorial", "label": "Tutorial" },
    { "value": "Product Demo", "label": "Product Demo" },
    { "value": "Help & How To", "label": "Help & How To" },
    { "value": "Virtual Events", "label": "Virtual Events" },
    { "value": "Advertising", "label": "Advertising" },
    { "value": "Live Stream", "label": "Live Stream" },
    { "value": "Speaker", "label": "Speaker" },
    { "value": "Recruitment", "label": "Recruitment" }
  ];

  export const equipment_data = [
    { "value": "Camera", "label": "Camera" },
    { "value": "Tripod", "label": "Tripod" },
    { "value": "Lighting Kit", "label": "Lighting Kit" },
    { "value": "Microphone", "label": "Microphone" },
    { "value": "Boom Pole", "label": "Boom Pole" },
    { "value": "Audio Recorder", "label": "Audio Recorder" },
    { "value": "Drone", "label": "Drone" },
    { "value": "Gimbal Stabilizer", "label": "Gimbal Stabilizer" },
    { "value": "Reflectors", "label": "Reflectors" },
    { "value": "Clapperboard", "label": "Clapperboard" },
    { "value": "Lens Kit", "label": "Lens Kit" },
    { "value": "Monitor", "label": "Monitor" },
    { "value": "Video Switcher", "label": "Video Switcher" }
]


  export const crew_data =[
    { "value": "Producer", "label": "Producer" },
    { "value": "Director", "label": "Director" },
    { "value": "Technical Director", "label": "Technical Director" },
    { "value": "Camera Operator", "label": "Camera Operator" },
    { "value": "Sound Engineer", "label": "Sound Engineer" },
    { "value": "Lighting Technician", "label": "Lighting Technician" },
    { "value": "Graphics Operator", "label": "Graphics Operator" },
    { "value": "Streaming Technician", "label": "Streaming Technician" },
    { "value": "Floor Manager", "label": "Floor Manager" },
    { "value": "Teleprompter Operator", "label": "Teleprompter Operator" },
    { "value": "IT Support", "label": "IT Support" },
    { "value": "Logistics Coordinator", "label": "Logistics Coordinator" },
    { "value": "Talent/Host", "label": "Talent/Host" },
    { "value": "Makeup Artist and Hair Stylist", "label": "Makeup Artist and Hair Stylist" },
    { "value": "Venue Coordinator", "label": "Venue Coordinator" },
    { "value": "Time Zone Manager", "label": "Time Zone Manager" }
]

  export const defaultFormValues = {
    projectName: "",
    contentType: "",
    budget: 5000,
    description: "",
    additional_details: "",
    locationDetails: [{
      location: "",
      start_date: "",
      end_date: "",
      filming_permits: false,
    }],
    ai_suggestions: true,
    crew: {},
    equipment: {}
  }

  export const tempTaskList = [
    {
        id: 1,
        title: "Location Permit",
        desc: "Get permit for the locations",
        deadline: "2022-05-30",
        status: false,
    },
    {
        id: 2,
        title: "Permit for Talent",
        desc: "Get permit for Talent",
        deadline: "2022-06-15",
        status: true,
    },
    {
        id: 3,
        title: "Equipment Rental",
        desc: "Rent equipment for the project",
        deadline: "2022-06-20",
        status: false,
    },
    {
        id: 4,
        title: "Location Scouting",
        desc: "Scout locations for the project",
        deadline: "2022-06-25",
        status: false,
    },
    
  ]