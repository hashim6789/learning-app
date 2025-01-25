import React from "react";
import { Outlet } from "react-router-dom";

//imported child components
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";

const AdminLayout: React.FC = () => {
  const sidebarItems = [
    { icon: <span>📊</span>, label: "Dashboard", href: "/admin/dashboard" },
    { icon: <span>👥</span>, label: "Learners", href: "/admin/learners" },
    { icon: <span>👨‍🏫</span>, label: "Mentors", href: "/admin/mentors" },
    { icon: <span>📚</span>, label: "Courses", href: "/admin/courses" },
    { icon: <span>🏷️</span>, label: "Category", href: "/admin/categories" },
    { icon: <span>💰</span>, label: "Financial", href: "/admin/financial" },
    { icon: <span>📋</span>, label: "Report", href: "/admin/reports" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex w-screen h-screen">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
