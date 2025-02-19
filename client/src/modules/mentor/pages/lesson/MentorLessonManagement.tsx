import type React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs";
import type { Path } from "../../../../shared/types/Path";
import { useLessonTableFunctionality } from "../../hooks/useTableFuctionalityOfLessons";
import LessonCard from "../../components/lesson/LessonCard";
import LoadingComponent from "../../components/LoadingComponent";

const paths: Path[] = [{ title: "My Lessons", link: "" }];

const MentorLessonManagement: React.FC = () => {
  const navigate = useNavigate();

  const {
    currentPage,
    searchQuery,
    data,
    totalPages,
    loading,
    handlePageChange,
    handleSearchChange,
    handleDelete,
  } = useLessonTableFunctionality({ itemsPerPage: 6 });

  if (loading) {
    return <LoadingComponent item="lesson" theme="purple" />;
  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Breadcrumbs paths={paths} />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Lesson Management
          </h1>
          <button
            onClick={() => navigate("/mentor/my-lessons/create")}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            + Create Lesson
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            No lessons available
          </div>
        )}
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
    </div>
  );
};

export default MentorLessonManagement;
