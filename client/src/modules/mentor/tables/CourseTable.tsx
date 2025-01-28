import React, { useState } from "react";
import { Search, Trash2, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTableFunctionality } from "../../../hooks/useTable";
import useCourseManagement from "../../../hooks/useCourseManagement";
import { config } from "../../../shared/configs/config";
import { CourseStatus } from "../../../shared/types/CourseStatus";
import { useCourseTableFunctionality } from "../hooks/useCourseTableFunctionality";
import { Category } from "../../../shared/types/Category";

interface Course {
  id: string;
  status: CourseStatus;
  title: string;
  category: Category;
  thumbnail: string;
}

interface CourseCardProps {
  courses: Course[];
}

const CourseCard: React.FC<CourseCardProps> = ({ courses }) => {
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
    paginatedData,
    totalPages,
    currentPage,
    courseFilterStatus,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
  } = useCourseTableFunctionality({
    data: availableCourses,
    itemsPerPage: 6,
    filterField: "title",
  });

  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-purple-100 text-purple-600";
      case "rejected":
        return "bg-red-100 text-red-600";
      case "draft":
        return "bg-gray-100 text-gray-600";
    }
  };

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
            {["all", "approved", "pending", "rejected", "draft"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => handleFilterChange(status as CourseStatus)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    courseFilterStatus === status
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

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedData.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden cursor-pointer"
            onClick={() => navigate(`/mentor/courses/${course.id}`)}
          >
            {/* Thumbnail */}
            <div className="h-48 overflow-hidden">
              <img
                src={course.thumbnail || "/api/placeholder/400/240"}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Course Details */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {course.category.title}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                    course.status
                  )}`}
                >
                  {course.status}
                </span>
              </div>

              {/* Action Buttons */}
              {/* <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() =>
                    navigate(`/mentor/courses/${course.id}/lessons`)
                  }
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <BookOpen size={16} />
                  Lessons
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-end items-center gap-2">
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

export default CourseCard;
