import type React from "react";
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
              `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-purple-100 text-purple-800 border-r-4 border-purple-600"
                  : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
              }`
            }
          >
            <span className="text-purple-500">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default MentorSidebar;
