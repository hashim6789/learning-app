import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const { theme } = useSelector((state: RootState) => state.theme);
  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const outletStyle =
    theme === "light"
      ? "bg-purple-50 text-purple-600"
      : "dark:bg-gray-800 text-purple-200";

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === "dark"
          ? "dark bg-gray-900 text-purple-300"
          : "bg-purple-100 text-purple-800"
      }`}
    >
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div
          className={`flex flex-col flex-1 min-h-screen ${
            isSidebarOpen ? "md:ml-64 ml-20" : "ml-20"
          } transition-all duration-300 ease-in-out`}
        >
          <div className={`flex-1 overflow-y-auto ${outletStyle} mx-4 py-4`}>
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
