import React from "react";
import { Outlet } from "react-router-dom";
import LearnerFooter from "../components/LearnerFooter";
import LearnerNavbar from "../components/LearnerNavbar";

interface LayoutProps {
  className?: string;
}

// Main Layout Component
const LearnerLayout: React.FC<LayoutProps> = ({ className = "" }) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <LearnerNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <LearnerFooter />
    </div>
  );
};

export default LearnerLayout;
