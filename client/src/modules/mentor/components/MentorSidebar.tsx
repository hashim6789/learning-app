import React from "react";
import { NavLink } from "react-router-dom";

interface MentorSidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface MentorSidebarProps {
  items: MentorSidebarItem[];
}

const MentorSidebar: React.FC<MentorSidebarProps> = ({ items }) => {
  return (
    <aside className="w-80 bg-white h-100 border-r">
      <div className="py-4 h-100">
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default MentorSidebar;
