import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/MentorNavbar";
import Sidebar from "../components/MentorSidebar";
import Footer from "../components/MentorFooter";

const MentorLayout: React.FC = () => {
  const sidebarItems = [
    { icon: <span>📊</span>, label: "Dashboard", href: "/mentor/dashboard" },
    { icon: <span>👥</span>, label: "My Courses", href: "/mentor/my-courses" },
    { icon: <span>👥</span>, label: "My lessons", href: "/mentor/my-lessons" },
    {
      icon: <span>👥</span>,
      label: "My Materials",
      href: "/mentor/my-materials",
    },
    {
      icon: <span>👨‍🏫</span>,
      label: "My Learners",
      href: "/mentor/my-learners",
    },
    { icon: <span>📚</span>, label: "Earnings", href: "/mentor/earnings" },
    { icon: <span>🏷️</span>, label: "Profile", href: "/mentor/profile" },
    { icon: <span>💰</span>, label: "Requests", href: "/mentor/requests" },
    { icon: <span>📋</span>, label: "Meetings", href: "/mentor/meetings" },
  ];

  return (
    <div className="min-h-screen w-screen flex flex-col bg-gray-50">
      <Navbar mentorName="Hashim" profileImage="" />

      <div className="flex flex-1 w-full h-full">
        <Sidebar items={sidebarItems} />

        <main className="flex-1 min-h-screen max-w-full overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MentorLayout;
