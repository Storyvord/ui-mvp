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
import { calenderEventType, projectArray } from './types'
import { projectDetailItem } from './types'
import moment from 'moment'

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
    "Events",
    "People Stories",
    "Animation",
    "Company News",
    "Company Stories",
    "Case Studies",
    "Interviews",
    "Tutorial",
    "Product Demo",
    "Help & How To",
    "Virtual Events",
    "Advertising",
    "Live Stream",
    "Speaker",
    "Recruitment",
    "Other"
  ];

  export const equipment_data = [
    "Camera",
    "Tripod",
    "Lighting Kit",
    "Microphone",
    "Boom Pole",
    "Audio Recorder",
    "Drone",
    "Gimbal Stabilizer",
    "Reflectors",
    "Clapperboard",
    "Lens Kit",
    "Monitor",
    "Video Switcher",
  ];

  export const crew_data = [
    "Director",
    "Producer",
    "Screenwriter",
    "Director of Photography(Cinemantography)",
    "Production Designer",
    "Art Designer",
    "Sound Designer",
    "Editor",
    "Costume Designer",
    "Makeup Artist",
    "Special Effect Supervisor",
    "Composer",
    "Casting Designer",
    "Other"
  ];