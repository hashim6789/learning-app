import React, { useState } from "react";
import { Search } from "lucide-react";
import { Course } from "../../../shared/types/Course";
import { CourseStatus } from "../../mentor/hooks/useCourseTableFunctionality";
import { getCourseStatusColor } from "../../../shared/utils/colors";
import { useNavigate } from "react-router-dom";

const defaultThumbnail = "https://via.placeholder.com/150";

interface CoursesTableProps {
  courses: Course[];
}

const CoursesTable: React.FC<CoursesTableProps> = ({ courses }) => {
  const [filterStatus, setFilterStatus] = useState<"all" | CourseStatus>("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5); // Number of courses per page

  const navigate = useNavigate();

  // Filter courses based on status
  const filteredCourses = courses.filter((course) => {
    if (filterStatus === "all") return true;
    return course.status === filterStatus;
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Get the courses for the current page
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-800">Courses</h2>
          <span className="text-sm text-gray-500">
            {courses.length} Courses
          </span>
        </div>
      </div>

      {/* Header and filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-80">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search title..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filter by</span>
          <div className="flex gap-2">
            {["all", "Approved", "Rejected", "Pending", "Draft"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status as any)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filterStatus === status
                      ? "bg-purple-100 text-purple-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Course Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Thumbnail
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.length > 0 ? (
              currentCourses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getCourseStatusColor(
                        course.status
                      )}`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-800">
                      {course.title}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {course.category.title}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={course.thumbnail || defaultThumbnail}
                      alt="Course Thumbnail"
                      className="w-16 h-16 rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/admin/courses/${course.id}`)}
                      className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-600">
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className="text-gray-500 hover:text-gray-700"
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              className="text-gray-500 hover:text-gray-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesTable;
