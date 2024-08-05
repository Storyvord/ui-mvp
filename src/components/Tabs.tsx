import { FC } from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: string[]
}

const Tabs: FC<TabsProps> = ({ activeTab, setActiveTab, tabs }) => {

  return (
    <div className="border-b border-gray-200 bg-white overflow-x-auto pl-4">
      <nav className="flex space-x-4" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap  px-1 py-3 text-xl font-semibold ${
              activeTab === tab
                ? "from-gray-900 border-b-2 border-gray-700 "
                : " text-gray-500 hover:text-gray-700"
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