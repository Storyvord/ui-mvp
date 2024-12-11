"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useParams, usePathname, useSelectedLayoutSegments } from "next/navigation";
import { useSideBarControl } from "@/context/SideBarContext";
import { useProjectControl } from "@/context/ProjectContext";
import { cn } from "@/lib/utils";

const SideBarButton = ({
  Icon,
  text,
  link,
  root,
}: {
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  link: string;
  root: string;
}) => {
  const { id } = useParams();
  const path = usePathname();
  const { setisSideBarOpen } = useSideBarControl();

  const { setProject } = useProjectControl();

  const handleClick = () => {
    setisSideBarOpen(false);
  };
  const checkLink = path.includes(link);
  return (
    <Link href={`/project-details/${id}/${link}`}>
      <button
        onClick={handleClick}
        className={cn(
          "w-full h-auto flex items-center gap-4 px-4 py-3 capitalize justify-start rounded-lg ",
          checkLink
            ? "bg-gradient-to-tr from-gray-900 to-gray-800 text-white hover:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
            : "text-[#607D8B] hover:bg-[#607D8B]/10 active:bg-[#607D8B]/30"
        )}
      >
        {Icon && <Icon className="w-6 h-6" />}
        <p className="block antialiased text-base leading-relaxed text-inherit font-medium capitalize">
          {text}
        </p>
      </button>
    </Link>
  );
};

export default SideBarButton;
