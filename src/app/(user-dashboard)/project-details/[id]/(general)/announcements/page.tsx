"use client"
import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FiTrash2 } from "react-icons/fi";

interface Announcement {
  id: number;
  content: string;
}

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: 1, content: "Welcome to our project! Stay tuned for updates." },
    { id: 2, content: "Casting call for lead roles happening next week." },
    { id: 3, content: "Location scouting is in progress, exciting locations to be revealed soon." },
  ]);
  const [previousAnnouncements, setPreviousAnnouncements] = useState<Announcement[]>([
    { id: 1, content: "Script finalization completed." },
    { id: 2, content: "Initial casting round completed." },
    { id: 3, content: "Budget for the next phase approved." },
  ]);
  const [newAnnouncementContent, setNewAnnouncementContent] = useState<string>("");

  const handleCreateAnnouncement = () => {
    if (!newAnnouncementContent.trim()) return; // Prevent adding empty announcements
    const newAnnouncement: Announcement = {
      id: announcements.length + 1,
      content: newAnnouncementContent,
    };
    setAnnouncements([...announcements, newAnnouncement]);
    setNewAnnouncementContent(""); // Clear input after adding
  };

  const handleDeleteAnnouncement = (announcementId: number) => {
    const announcementToDelete = announcements.find((announcement) => announcement.id === announcementId);
    if (announcementToDelete) {
      setPreviousAnnouncements([...previousAnnouncements, announcementToDelete]);
      setAnnouncements(announcements.filter((announcement) => announcement.id !== announcementId));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewAnnouncementContent(e.target.value);
  };

  return (
    <div className="mt-12 px-4 md:px-0">
      <Tabs>
        <TabList className="flex gap-6 underline mb-8 cursor-pointer">
          <Tab>Current Announcements</Tab>
          <Tab>Previous Announcements</Tab>
        </TabList>

        <TabPanel>
          <h2 className="text-2xl font-bold mb-4">Current Announcements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-white shadow-md rounded-lg p-4 relative">
                <p>{announcement.content}</p>
                <button
                  className="absolute top-0 right-0 m-2 text-red-700"
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Input
              type="text"
              placeholder="Type your announcement here..."
              value={newAnnouncementContent}
              onChange={handleInputChange}
              className="mb-4 w-full max-w-xs"
            />
            <Button onClick={handleCreateAnnouncement} className="mt-4">
              Add Announcement
            </Button>
          </div>
        </TabPanel>

        <TabPanel>
          <h2 className="text-2xl font-bold mb-4">Previous Announcements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {previousAnnouncements.map((announcement) => (
              <div key={announcement.id} className="bg-white shadow-md rounded-lg p-4">
                <p>{announcement.content}</p>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Announcements;
