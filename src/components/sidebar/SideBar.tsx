"use client";
import { projectdetailsItems } from "@/constant/constant";
import { useProjectControl } from "@/context/ProjectContext";
import { useSideBarControl } from "@/context/SideBarContext";
import Image from "next/image";
import Link from "next/link";
import SideBarButton from "./components/SideBarButton";
import SideBarCloseButton from "./components/SideBarCloseButton";
import { useParams } from "next/navigation";

const SideBar = () => {
  const { isSideBarOpen } = useSideBarControl();
  const { setProject } = useProjectControl();
  const { id: projectId } = useParams();

  return (
    <aside
      className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-80"} overflow-y-auto bg-white shadow-sm fixed inset-0 z-50 h-100vh w-60 xl:w-72 transition-transform duration-300 md:translate-x-0 border border-blue-gray-100 font-poppins`}
    >
      <div className="relative">
        <SideBarCloseButton />
        <Link className=" mt-4" href={`/project-details/${projectId}`}>
          <Image
            onClick={() => setProject({ id: "", name: "" })}
            className=" mx-auto w-[150px] pt-4 mb-8 "
            src="/logo-a6299cea.png"
            width={150}
            height={78}
            alt=""
          />
        </Link>
      </div>
      <div className="mx-4 -mt-6">
        <Link
          href="/dashboard"
          className=" flex items-center gap-4 py-3 hover:text-text-color-1 pl-4 w-full text-gray-500 font-semibold"
        >
          <Image src="/icons/left-arrow.svg" alt="" width={17} height={17} />
          Dashboard
        </Link>

        <Link
          href={`/project-details/${projectId}`}
          className=" flex items-center gap-4 border rounded-lg py-3 hover:text-text-color-1 pl-4 w-full text-gray-500 font-semibold"
        >
          <Image src="/icons/dashboard-icon.svg" alt="" width={17} height={17} />
          Project Details
        </Link>

        {projectdetailsItems.map((details) => (
          <div key={details.title} className="flex flex-col gap-1">
            <h1 className=" pl-2 text-sm text-gray-400 mt-4 uppercase">{details.title}</h1>
            {details.items.map((item) => (
              <li key={item.text} className="list-none">
                <SideBarButton
                  Icon={item.icon}
                  link={item.link}
                  root="project-details"
                  text={item.text}
                />
              </li>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
