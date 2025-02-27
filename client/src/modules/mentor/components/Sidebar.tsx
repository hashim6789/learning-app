import { Home, BookOpen, FileText, Video } from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../../store";

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: Home, label: "Dashboard", href: "/mentor/dashboard" },
  { icon: BookOpen, label: "My Courses", href: "/mentor/my-courses" },
  { icon: Video, label: "My Lessons", href: "/mentor/my-lessons" },
  { icon: FileText, label: "My Materials", href: "/mentor/my-materials" },
  { icon: Video, label: "Meetings", href: "/mentor/meetings" },
];

const Sidebar: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const style =
    theme === "light"
      ? "hover:bg-purple-600 hover:text-purple-100"
      : "hover:bg-purple-100 hover:text-purple-600";

  const shadowClass =
    theme === "dark" ? "shadow-custom-dark" : "shadow-custom-light";

  const activeStyle =
    theme === "light"
      ? "bg-purple-600 text-purple-100"
      : "bg-purple-100 text-purple-600";

  return (
    <div
      className={`fixed top-16 left-0 h-full z-40 ${
        isSidebarOpen ? "w-64" : "w-20"
      } ${
        theme === "dark"
          ? "dark bg-gray-900 text-purple-300 border-gray-700"
          : "bg-purple-100 text-purple-800 border-purple-200"
      } border-2 transition-all duration-100 ease-in-out overflow-hidden rounded-lg`}
    >
      <nav className="mt-4">
        {sidebarItems.map((item, index) => (
          <NavLink
            to={item.href}
            key={index}
            className={({ isActive }) =>
              `
              flex items-center ${style} ${shadowClass}
              ${isSidebarOpen ? "px-4" : "justify-center"} 
              py-3 my-2
              transition duration-200 rounded-md
              ${isActive ? activeStyle : ""}
              `
            }
          >
            <item.icon className="w-6 h-6" />
            {isSidebarOpen && (
              <span className="ml-4 flex items-center">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
