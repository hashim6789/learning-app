import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Course {
  id: string;
  status: "Approved" | "Rejected" | "Pending" | "Draft";
  title: string;
  category: string;
  thumbnail: string;
}

interface CourseTableProps {
  courses: Course[];
}

const CourseTable: React.FC<CourseTableProps> = ({ courses }) => {
  console.log("courses :", courses);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "Approved" | "Rejected" | "Pending" | "Draft"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [courseStatus, setCourseStatus] = useState<{
    [key: string]: Course["status"];
  }>(
    courses.reduce((acc, course) => {
      acc[course.id] = course.status;
      return acc;
    }, {} as { [key: string]: Course["status"] })
  );

  const navigate = useNavigate();

  const handleStatusToggle = (courseId: string) => {
    setCourseStatus((prevStatus) => ({
      ...prevStatus,
      [courseId]:
        prevStatus[courseId] === "Approved"
          ? "Rejected"
          : prevStatus[courseId] === "Pending"
          ? "Approved"
          : "Pending",
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesStatus =
      filterStatus === "all" || courseStatus[course.id] === filterStatus;
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-800">Courses</h2>
          <span className="text-sm text-gray-500">
            {filteredCourses.length} Courses
          </span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-80">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search course name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filter by</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === "all"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("Approved")}
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === "Approved"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilterStatus("Pending")}
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === "Pending"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus("Rejected")}
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === "Rejected"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Rejected
            </button>
            <button
              onClick={() => setFilterStatus("Draft")}
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === "Draft"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Draft
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Course Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr
                key={course.id}
                className="border-b border-gray-200 last:border-0"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-800">
                    {course.title}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {course.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      courseStatus[course.id] === "Approved"
                        ? "bg-green-100 text-green-600"
                        : courseStatus[course.id] === "Pending"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {courseStatus[course.id]}
                  </span>
                </td>
                {/* <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleStatusToggle(course.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Toggle Status
                    </button>
                  </div>
                </td> */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        navigate(`/mentor/courses/${course.id}/lessons`)
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Lessons
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseTable;
