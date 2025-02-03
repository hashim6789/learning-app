import React from "react";
import { Outlet } from "react-router-dom";

import LearnerNavbar from "../components/LearnerNavbar";
import LearnerFooter from "../components/LearnerFooter";
// LearnerLayout Component
const LearnerLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Notification Banner */}

      {/* Navbar */}
      <LearnerNavbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <LearnerFooter />
    </div>
  );
};

export default LearnerLayout;

// import React from "react";
// import { Outlet } from "react-router-dom";

// //imported child components
// import LearnerFooter from "../components/LearnerFooter";
// import LearnerNavbar from "../components/LearnerNavbar";

// interface LayoutProps {
//   className?: string;
// }

// // Main Layout for Learner Component
// const LearnerLayout: React.FC<LayoutProps> = ({ className = "" }) => {
//   return (
//     <div className={`min-h-screen flex flex-col ${className}`}>
//       <LearnerNavbar />
//       <main className="flex-grow">
//         <Outlet />
//       </main>
//       <LearnerFooter />
//     </div>
//   );
// };

// export default LearnerLayout;

// <nav className="border-b border-gray-200 bg-white">
//   <div className="container mx-auto px-4">
//     <div className="flex items-center justify-between h-16">
//       {/* Left Section */}
//       <div className="flex items-center gap-8">
//         <img src="/coursera-logo.svg" alt="Coursera" className="h-8" />
//         <button className="text-blue-800 hover:text-blue-900 font-medium flex items-center gap-2">
//           Explore
//           <ChevronDown size={20} />
//         </button>
//       </div>

//       {/* Search Bar */}
//       <div className="hidden md:flex flex-1 max-w-2xl mx-8">
//         <div className="relative w-full">
//           <input
//             type="text"
//             placeholder="What do you want to learn?"
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
//           />
//           <Search
//             className="absolute left-3 top-2.5 text-gray-500"
//             size={20}
//           />
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-4">
//         <button
//           onClick={() => setShowNotification((prev) => !prev)}
//           className="hover:bg-gray-100 p-2 rounded-full"
//         >
//           <NotificationPanel />
//         </button>
//         <button className="hover:bg-gray-100 p-2 rounded-full">
//           <Globe size={20} className="text-gray-800" />
//         </button>
//         <div className="h-8 w-8 bg-blue-800 rounded-full flex items-center justify-center text-white font-medium">
//           M
//         </div>
//       </div>
//     </div>

//     {/* Navigation Links */}
//     <div className="flex space-x-8 -mb-px">
//       <NavLink
//         to="/home"
//         className={({ isActive }) =>
//           `border-b-2 px-1 py-4 text-sm font-medium ${
//             isActive
//               ? "border-blue-800 text-blue-800"
//               : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800"
//           }`
//         }
//       >
//         Home
//       </NavLink>
//       <NavLink
//         to="/my-learning"
//         className={({ isActive }) =>
//           `border-b-2 px-1 py-4 text-sm font-medium ${
//             isActive
//               ? "border-blue-800 text-blue-800"
//               : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800"
//           }`
//         }
//       >
//         My Learning
//       </NavLink>
//       <NavLink
//         to="/online-degrees"
//         className={({ isActive }) =>
//           `border-b-2 px-1 py-4 text-sm font-medium ${
//             isActive
//               ? "border-blue-800 text-blue-800"
//               : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800"
//           }`
//         }
//       >
//         Online Degrees
//       </NavLink>
//       <NavLink
//         to="/careers"
//         className={({ isActive }) =>
//           `border-b-2 px-1 py-4 text-sm font-medium ${
//             isActive
//               ? "border-blue-800 text-blue-800"
//               : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800"
//           }`
//         }
//       >
//         Careers
//       </NavLink>
//     </div>
//   </div>
// </nav>
