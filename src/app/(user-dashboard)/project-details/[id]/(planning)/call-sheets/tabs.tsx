import { FC } from "react";

interface TabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Tabs: FC<TabsProps> = ({ activeTab, setActiveTab }) => {
    const tabs = ["Call Sheets"];

    return (
        <div className="border-b border-gray-200 mb-4 overflow-x-auto">
            <nav
                className={`flex space-x-4 ${activeTab === "Call Sheets" ? "justify-center sm:justify-start" : ""}`}
                aria-label="Tabs"
            >
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                            ? "border-gray-900 text-gray-900"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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