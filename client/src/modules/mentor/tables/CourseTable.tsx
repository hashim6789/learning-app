import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTableFunctionality } from "../../../hooks/useTable";
import useCourseManagement from "../../../hooks/useCourseManagement";
import { config } from "../../../shared/configs/config";

interface Category {
  id: string;
  title: string;
  isListed: boolean;
}
interface Course {
  id: string;
  status: "Approved" | "Rejected" | "Pending" | "Draft";
  title: string;
  category: Category;
  thumbnail: string;
}

interface CourseTableProps {
  courses: Course[];
}

const CourseTable: React.FC<CourseTableProps> = ({ courses }) => {
  const { deleteCourse } = useCourseManagement(config.API_BASE_URL);
  const [availableCourses, setCourses] = useState<Course[]>(courses);
  const navigate = useNavigate();

  const handleDelete = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
      setCourses(availableCourses.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error(error);
    }
  };

  const {
    searchQuery,
    filterStatus,
    paginatedData,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
  } = useTableFunctionality<Course>({
    data: availableCourses,
    itemsPerPage: 5,
    filterField: "title",
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-800">Courses</h2>
          <span className="text-sm text-gray-500">
            {paginatedData.length} Courses
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
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filter by</span>
          <div className="flex gap-2">
            {["all", "Approved", "Pending", "Rejected", "Draft"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => handleFilterChange(status as any)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filterStatus === status
                      ? "bg-purple-100 text-purple-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
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
            {paginatedData.map((course) => (
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
                    {course.category.title}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      course.status === "Approved"
                        ? "bg-green-100 text-green-600"
                        : course.status === "Pending"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>
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
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded border ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-black"
          }`}
        >
          Prev
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded border ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-black"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseTable;
