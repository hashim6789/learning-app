import React from "react";

interface TabsProps {
  activeTab: "overview" | "lessons";
  setActiveTab: (tab: "overview" | "lessons") => void;
}

const CourseTabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-purple-200">
      <button
        onClick={() => setActiveTab("overview")}
        className={`flex-1 py-3 font-semibold ${
          activeTab === "overview"
            ? "bg-purple-500 text-white"
            : "text-purple-600 hover:bg-purple-100"
        }`}
      >
        Overview
      </button>
      <button
        onClick={() => setActiveTab("lessons")}
        className={`flex-1 py-3 font-semibold ${
          activeTab === "lessons"
            ? "bg-purple-500 text-white"
            : "text-purple-600 hover:bg-purple-100"
        }`}
      >
        Lessons
      </button>
    </div>
  );
};

export default CourseTabs;
