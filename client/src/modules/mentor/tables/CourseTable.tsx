import React from "react";
import { useNavigate } from "react-router-dom";
import { CourseStatus } from "../../../shared/types/CourseStatus";
import { useCourseTableFunctionality } from "../hooks/useCourseTableFunctionality";
import { getCourseStatusColor } from "../../../shared/utils/colors";

interface CourseCardProps {}

const CourseCard: React.FC<CourseCardProps> = () => {
  const navigate = useNavigate();
  const {
    searchQuery,
    totalPages,
    currentPage,
    courseFilterStatus,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    data,
  } = useCourseTableFunctionality({
    itemsPerPage: 6,
    filterField: "title",
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-800">Courses</h2>
          <span className="text-sm text-gray-500">{data.length} Courses</span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search materials..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
        />
        <select
          value={courseFilterStatus}
          onChange={(e) => handleFilterChange(e.target.value as CourseStatus)}
          className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All</option>
          {[
            "approved",
            "rejected",
            "completed",
            "requested",
            "published",
            "draft",
          ].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length > 0 ? (
          data.map((course) => (
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
                    className={`px-3 py-1 rounded-full text-sm ${getCourseStatusColor(
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
          ))
        ) : (
          <div className="text-center text-gray-500 py-12">
            No lessons available
          </div>
        )}
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
