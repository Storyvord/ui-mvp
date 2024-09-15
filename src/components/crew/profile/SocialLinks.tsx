"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import SocialLinksForm from "../update-profile/SocialLinksForm";
import FieldControl from "./FieldControl";

type SocialLinksProps = {
  socialLinksData: {
    link: string;
    crew: number;
    id: number;
  }[];
  deleteSocialLink: (id: number) => void;
  isLoadingDeleteSocialLinks: boolean;
};

const SocialLinks = ({
  socialLinksData,
  deleteSocialLink,
  isLoadingDeleteSocialLinks,
}: SocialLinksProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editableFieldId, setEditableFieldId] = useState<number>();

  return (
    <div className="bg-white p-6 max-w-4xl mx-auto shadow-md">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Social Links</h2>
        <span className="flex gap-3">
          <FaPlus
            onClick={() => {
              setOpenDialog(true);
              setEditableFieldId(undefined);
            }}
            className="w-6 h-6 cursor-pointer"
          />
        </span>
      </div>
      {socialLinksData?.map((link, index) => (
        <div key={index + link.link} className="relative mb-2">
          <div className="absolute top-0 right-0">
            <FieldControl
              isLoading={isLoadingDeleteSocialLinks}
              deleteItem={deleteSocialLink}
              setEditableFieldId={setEditableFieldId}
              setOpenDialog={setOpenDialog}
              id={link.id}
            />
          </div>
          <a
            href={link?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 block"
          >
            {link?.link}
          </a>
        </div>
      ))}
      <SocialLinksForm
        fieldId={editableFieldId}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
};

export default SocialLinks;
