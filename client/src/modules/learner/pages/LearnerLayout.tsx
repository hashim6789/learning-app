import React from "react";
import { Outlet } from "react-router-dom";

//imported child components
import LearnerFooter from "../components/LearnerFooter";
import LearnerNavbar from "../components/LearnerNavbar";

interface LayoutProps {
  className?: string;
}

// Main Layout for Learner Component
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
