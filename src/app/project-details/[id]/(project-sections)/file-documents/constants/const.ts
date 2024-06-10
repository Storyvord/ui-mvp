
import { Dog, Coins, Shirt, Users, HandCoins, Landmark, Folders, ShieldCheck, MapPinned, Tag, BookUser, GalleryHorizontalEnd, MonitorPlay, CookingPot, Star, Pencil, Cloud, Bus, ShirtIcon, Phone, ScrollText, Megaphone, LandmarkIcon, ListChecks, Fullscreen, Utensils, CalendarDaysIcon, } from 'lucide-react';

export const icons = {
    Dog,
    HandCoins,
    Coins,
    Shirt,
    Users,
    Landmark,
    Folders,
    ShieldCheck,
    MapPinned,
    Tag,
    BookUser,
    GalleryHorizontalEnd,
    MonitorPlay,
    CookingPot,
    ShirtIcon,
    Phone,
    ScrollText,
    Megaphone,
    LandmarkIcon,
    ListChecks, Fullscreen, Utensils, CalendarDaysIcon,
    Star, Pencil, Cloud, Bus,
};

interface Contract {
    icon: keyof typeof icons;
    title: string;
    description: string;
}

export type ContractsArray = Contract[];

export const contracts: ContractsArray = [
    {
        icon: 'Dog',
        title: 'Animals',
        description: 'You can find all contracts for animals here.',
    },
    {
        icon: 'Shirt',
        title: 'Costumes',
        description: 'Here are the contracts for every piece.',
    },
    {
        icon: 'Coins',
        title: 'Insurances',
        description: 'Here you can organize all contracts for insurance.',
    },
    {
        icon: 'Users',
        title: 'Cast',
        description: 'All of the cast members contracts are available here.',
    },
    {
        icon: 'HandCoins',
        title: 'Overall Financing',
        description: 'This is where contract investors can be found.',
    },
    {
        icon: 'Landmark',
        title: 'Bank',
        description: 'You may arrange all bank contracts here.',
    },
    {
        icon: 'Folders',
        title: 'Rights',
        description: 'Here you can organise all contracts for rights.',
    },
    {
        icon: 'ShieldCheck',
        title: 'Completion Bond',
        description: 'All contracts can be arranged here for completion bond.',
    },
    {
        icon: 'MapPinned',
        title: 'Locations',
        description: 'All location contracts can be arranged here.',
    },

    {
        icon: 'Tag',
        title: 'Production Design',
        description: 'Each and every production design contract is available here.',
    }, {
        icon: 'BookUser',
        title: 'Miscellaneous Contracts',
        description: 'Contracts for other miscellaneous purposes can be arranged here.',
    },
];