import clsx from "clsx";
import { FC } from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: string[];
  className?: string;
}

const Tabs: FC<TabsProps> = ({ activeTab, setActiveTab, tabs, className }) => {
  return (
    <div className={clsx("overflow-x-auto", className)}>
      <nav className="flex space-x-4" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap  px-3 py-2 font-semibold rounded-sm ${
              activeTab === tab
                ? "text-white border-2 border-black bg-gray-900"
                : " text-gray-500 hover:text-gray-700 border-2 border-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;
