"use client";

import { FC, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Images, LockKeyhole, MoreVertical, Plus, Trash } from "lucide-react";
import { icons } from "./ui/Icons";
import { Contracts, Script, Sheet } from "./ui/docsIcons";
import { Button } from "@/components/ui/button";
import RoomPage from "./RoomPage";
import ContractsPage from "./ContractsPage";
import ScriptsPage from "./ScriptsPage";
import Tabs from "./Tabs";
import CallSheetsPage from "./CallSheetsPage";

type FormData = {
    roomName: string;
    roomDesc: string;
    icon?: React.ElementType;
    email?: string;
};

type RoomDataType = {
    id: string;
    icon: React.ElementType;
    title: string;
    description: string;
    onClick?: () => void;
};

type Pages = {
    [key: string]: FC<{ roomId: string }>;
};

const pages: Pages = {
    contracts: ContractsPage,
    "scripts-development": ScriptsPage,
    "sent-call-sheets": CallSheetsPage,
};

const File: FC = () => {
    const [isHome, setIsHome] = useState(true);
    const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showEmailField, setShowEmailField] = useState(false);
    const [loading, setLoading] = useState(false);
    const [createdRooms, setCreatedRooms] = useState<RoomDataType[]>([]);
    const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(null);
    const [selectedIconIndex, setSelectedIconIndex] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState("Home");

    const [changingIconForRoomIndex, setChangingIconForRoomIndex] = useState<number | null>(null);
    const changingIconForPredefined = useRef<boolean>(false);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>();

    const emailFieldRef = useRef<HTMLDivElement>(null);
    const moreVerticalMenuRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [files] = useState<RoomDataType[]>([
        {
            id: "contracts",
            icon: Contracts,
            title: "Contracts",
            description: "You can find contracts for actors, insurances, and more here.",
        },
        {
            id: "scripts-development",
            icon: Script,
            title: "Scripts & Development",
            description: "You can find everything related to development here.",
        },
        {
            id: "sent-call-sheets",
            icon: Sheet,
            title: "Sent Call Sheets",
            description: "You can find copies of your call sheets here after sending them to your crew.",
        },
    ]);

    const handleCardClick = (file: RoomDataType) => {
        setIsHome(false);
        setCurrentRoomId(file.id);
        setActiveTab(file.title);
    };

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setLoading(true);
        setTimeout(() => {
            const roomId = `user-room-${createdRooms.length + 1}-${data.roomName}`;
            const room: RoomDataType = {
                id: roomId,
                icon: data.icon || Contracts,
                title: data.roomName,
                description: data.roomDesc,
            };
            setCreatedRooms([...createdRooms, room]);
            setLoading(false);
            setShowForm(false);
            reset();
        }, 1000);
    };

    const handleLockClick = () => {
        if (showEmailField) {
            setValue("email", "");
        }
        setShowEmailField((prev) => !prev);
    };

    const handleDeleteRoom = (index: number) => {
        if (index < files.length) {
            alert("Cannot delete predefined files!");
        } else {
            const roomIdToDelete = createdRooms[index - files.length].id;
            localStorage.removeItem(`${roomIdToDelete}-objects`);
            setCreatedRooms((rooms) => rooms.filter((_, i) => i !== index - files.length));
        }
    };

    const handleChangeIcon = (index: number, newIcon: React.ElementType) => {
        if (index < files.length) {
            files[index].icon = newIcon;
        } else {
            setCreatedRooms((rooms) =>
                rooms.map((room, i) => (i === index - files.length ? { ...room, icon: newIcon } : room))
            );
        }
    };

    const handleDotClick = (index: number) => {
        setSelectedRoomIndex(index === selectedRoomIndex ? null : index);
    };

    const handleOpenChangeIconModal = (index: number) => {
        if (index < files.length) changingIconForPredefined.current = true;
        setChangingIconForRoomIndex(index);
        setSelectedIconIndex(null);
    };

    const handleCloseChangeIconModal = () => {
        setChangingIconForRoomIndex(null);
        changingIconForPredefined.current = false;
    };

    const handleIconSelect = (newIcon: React.ElementType) => {
        if (changingIconForRoomIndex !== null) {
            handleChangeIcon(changingIconForRoomIndex, newIcon);
            handleCloseChangeIconModal();
            setSelectedRoomIndex(null);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emailFieldRef.current && !emailFieldRef.current.contains(event.target as Node)) {
                setShowEmailField(false);
                setValue("email", "");
            }

            if (selectedRoomIndex !== null) {
                const currentMenuRef = moreVerticalMenuRefs.current[selectedRoomIndex];
                if (currentMenuRef && !currentMenuRef.contains(event.target as Node)) {
                    setSelectedRoomIndex(null);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [emailFieldRef, setValue, selectedRoomIndex]);

    const handleEmailSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setShowEmailField(false);
        setValue("email", "");
    };

    const RoomComponent = currentRoomId && currentRoomId.startsWith("user-room")
        ? RoomPage
        : (currentRoomId ? pages[currentRoomId] : RoomPage);

    const defaultTabs = ["Contracts", "Scripts & Development", "Sent Call Sheets"];
    const allTabs = ["Home"].concat(isHome ? [] : defaultTabs.concat(createdRooms.map(room => room.title)));

    return (
        <section className="relative py-5">
            <Tabs
                activeTab={activeTab}
                setActiveTab={(tab) => {
                    setActiveTab(tab);
                    if (tab === "Home") {
                        setIsHome(true);
                        setCurrentRoomId(null);
                    } else {
                        const room = [...files, ...createdRooms].find(room => room.title === tab);
                        if (room) {
                            setIsHome(false);
                            setCurrentRoomId(room.id);
                        }
                    }
                }}
                tabs={allTabs}
            />

            {isHome && (
                <>
                    <div className="text-black mb-5 flex flex-col md:flex-row lg:flex-row items-center lg:justify-between md:justify-between mt-5">
                        <Button
                            variant="outline"
                            className="flex items-center mb-4 md:mb-0 lg:mb-0" onClick={() => setShowForm(true)}
                        >
                            <Plus className="mr-2" /> Create Room
                        </Button>

                        <div className="flex items-center">
                            {!showEmailField && (
                                <Button variant="outline" className="flex flex-row" onClick={handleLockClick}>
                                    <LockKeyhole />
                                    <span className="ml-2">Access Rights</span>
                                </Button>
                            )}

                            {showEmailField && (
                                <div ref={emailFieldRef} className="relative flex items-center">
                                    <form onSubmit={handleEmailSubmit} className="flex items-center">
                                        <input
                                            className="w-35 lg:w-40 md:w-40 h-10 p-1 border border-gray-200 rounded text-sm"
                                            type="email"
                                            {...register("email", { required: "Email is required" })}
                                            placeholder="Enter email address"
                                        />
                                        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                                        <Button type="submit" variant="outline" size="icon" className="ml-2">
                                            <LockKeyhole />
                                        </Button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5">
                        {[...files, ...createdRooms].map((file, index) => (
                            <div
                                className="relative shadow-md rounded-lg p-4 bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                key={index}
                                onClick={() => handleCardClick(file)}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col space-y-1">
                                        <file.icon />
                                        <h3 className="font-semibold">{file.title}</h3>
                                        <span className="text-slate-500 text-sm">{file.description}</span>
                                    </div>
                                    {index >= files.length && (
                                        <div className="relative">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-0 right-0 p-1 text-gray-500"
                                                onClick={(e) => { e.stopPropagation(); handleDotClick(index); }}
                                                style={{ fontSize: "1.2rem", padding: "0.1rem" }}
                                            >
                                                <MoreVertical />
                                            </Button>
                                            {selectedRoomIndex === index && (
                                                <div
                                                    ref={(el) => { moreVerticalMenuRefs.current[index] = el; }}
                                                    className="absolute right-0 mt-8 bg-white border border-gray-200 rounded shadow-lg p-2 w-32"
                                                >
                                                    <button
                                                        className="w-full text-left text-xs px-2 py-1 hover:bg-gray-100 flex items-center"
                                                        onClick={(e) => { e.stopPropagation(); handleOpenChangeIconModal(index); }}>
                                                        <Images className="mr-2 h-4 w-4" /> Change Icon
                                                    </button>
                                                    <button
                                                        className="w-full text-left text-xs text-red-500 px-2 py-1 hover:bg-gray-100 flex items-center"
                                                        onClick={(e) => { e.stopPropagation(); handleDeleteRoom(index); setSelectedRoomIndex(null); }}
                                                    >
                                                        <Trash className="mr-2 h-4 w-4" /> Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {!isHome && currentRoomId && RoomComponent && (
                <RoomComponent key={currentRoomId} roomId={currentRoomId} />
            )}

            {changingIconForRoomIndex !== null && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center shadow-lg">
                    <div className="bg-white p-8 rounded-lg w-96 max-h-screen transform transition-transform duration-300 shadow-xl">
                        <div className="flex justify-center items-center pb-2 mb-4 border-b">
                            <h2 className="text-2xl font-medium">Change Icon</h2>
                        </div>
                        <div className="grid lg:grid-cols-6 md:grid-cols-6 grid-cols-6 lg:gap-2 md:gap-2 gap-2 px-4 py-4 cursor-pointer text-slate-400">
                            {icons.map((Icon, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleIconSelect(Icon)}
                                    className={`p-2 rounded cursor-pointer ${selectedIconIndex === index ? "text-black" : "text-slate-400"} ${selectedIconIndex === index && "hover:opacity-75"}`}
                                >
                                    <Icon />
                                </div>
                            ))}
                        </div>
                        <footer className="pt-4 flex justify-end space-x-3 mt-1">
                            <Button onClick={handleCloseChangeIconModal} type="button" variant="outline">
                                Close
                            </Button>
                        </footer>
                    </div>
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center shadow-lg">
                    <div className="bg-white p-8 rounded-lg w-96 max-h-screen transform transition-transform duration-300 shadow-xl">
                        <div className="flex justify-center items-center pb-2 mb-4 border-b">
                            <h2 className="text-2xl font-medium">Create Room</h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="block mb-2 text-xs">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className={`w-full p-2 border ${errors.roomName ? "border-red-500" : "border-gray-200"} rounded mb-4`}
                                    type="text"
                                    {...register("roomName", { required: "Name is required" })}
                                />
                                {errors.roomName && <span className="text-red-500 text-sm">{errors.roomName.message}</span>}
                            </div>
                            <div>
                                <label className="block mb-2 text-xs">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    className={`w-full p-2 border ${errors.roomDesc ? "border-red-500" : "border-gray-200"} rounded mb-4`}
                                    {...register("roomDesc", { required: "Description is required" })}
                                ></textarea>
                                {errors.roomDesc && <span className="text-red-500 text-sm">{errors.roomDesc.message}</span>}
                            </div>
                            <div className="flex flex-col">
                                <label className="text-medium">Select Icon</label>
                                <div className="grid lg:grid-cols-6 md:grid-cols-6 grid-cols-6 lg:gap-2 md:gap-2 gap-2 px-4 py-2 cursor-pointer text-slate-400">
                                    {icons.map((Icon, index) => (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                setValue("icon", Icon);
                                                setSelectedIconIndex(index);
                                            }}
                                            className={`p-2 rounded cursor-pointer hover:text-black ${selectedIconIndex === index ? "text-black" : "text-slate-400"}`}
                                        >
                                            <Icon />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <footer className="pt-4 flex justify-end space-x-3 mt-2">
                                <Button
                                    onClick={() => {
                                        setShowForm(false);
                                        reset();
                                    }}
                                    type="button"
                                    variant="outline"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" variant="default">
                                    {loading ? "Creating..." : "Create"}
                                </Button>
                            </footer>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default File;