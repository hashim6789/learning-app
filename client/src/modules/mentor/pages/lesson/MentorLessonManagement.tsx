import Swal from "sweetalert2";
import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../shared/utils/api";
import { config } from "../../../../shared/configs/config";
import type { Lesson } from "../../../../shared/types/Lesson";
import { showToast } from "../../../../shared/utils/toastUtils";
import Breadcrumbs from "../../components/BreadCrumbs";
import type { Path } from "../../../../shared/types/Path";
import { useTableFunctionalityOfLesson } from "../../hooks/useTableFuctionalityOfLessons";
import useFetch from "../../../../hooks/useFetch";
import LessonCard from "../../components/lesson/LessonCard";

const paths: Path[] = [{ title: "My Lessons", link: "" }];

const MentorLessonManagement: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch<any[]>("/mentor/lessons");
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const fetchedLessons: Lesson[] = data.map((item: Lesson) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        duration: item.duration,
        materials: item.materials,
      }));
      setLessons(fetchedLessons);
    }
  }, [data]);

  const {
    paginatedData: paginatedLessons,
    searchQuery,
    handleSearchChange,
    currentPage,
    handlePageChange,
    totalPages,
  } = useTableFunctionalityOfLesson(lessons, 6);

  const handleDelete = async (lessonId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6B46C1",
      cancelButtonColor: "#E53E3E",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`${config.API_BASE_URL}/mentor/lessons/${lessonId}`);
        showToast.success("The lesson was deleted successfully!");

        // Remove the deleted lesson from the state
        setLessons((prevLessons) =>
          prevLessons.filter((lesson) => lesson.id !== lessonId)
        );

        // Adjust the current page if necessary
        if (paginatedLessons.length === 1 && currentPage > 1) {
          handlePageChange(currentPage - 1);
        }
      } catch (error: any) {
        showToast.error(error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 mb-4 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading lesson details...
          </h2>
          <p className="text-gray-500 mt-2">
            Please wait while we fetch the information
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-800">
            Error fetching lesson details...
          </h2>
          <p className="text-red-500 mt-2">Please try again (:</p>
        </div>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-800">
            No Lessons Available...
          </h2>
          <p className="text-red-500 mt-2">Unavailable data (:</p>
        </div>
      </div>
    );
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
        {paginatedLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedLessons.map((lesson) => (
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
        <div className="flex justify-center mt-6">
          {totalPages > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded-lg mx-1"
            >
              Prev
            </button>
          )}
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          {totalPages > 1 && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded-lg mx-1"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorLessonManagement;
