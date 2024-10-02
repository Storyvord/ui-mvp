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
          "w-full font-poppins h-auto flex items-center gap-4 px-4 py-3 capitalize justify-start font-semibold text-text-color-2 hover:text-text-color-1",
          checkLink ? " bg-bg-color-2 text-text-color-1" : " "
        )}
      >
        {Icon && <Icon className="w-6 h-6" />}
        <p className="block font-sans antialiased text-base leading-relaxed text-inherit font-medium capitalize">
          {text}
        </p>
      </button>
    </Link>
  );
};

export default SideBarButton;
