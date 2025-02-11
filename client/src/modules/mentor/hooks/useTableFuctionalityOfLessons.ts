import { useState, useEffect } from "react";
import api from "../../../shared/utils/api";
import { Lesson } from "../../../shared/types/Lesson";
import { showToast } from "../../../shared/utils/toastUtils";
import Swal from "sweetalert2";

interface UseLessonTableFunctionalityOptions {
  itemsPerPage: number;
}

export function useLessonTableFunctionality({
  itemsPerPage,
}: UseLessonTableFunctionalityOptions) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [data, setData] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/mentor/lessons?search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const result = response.data;
        setData(result.data);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchData, 500); // Debounce effect
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

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
        await api.delete(`/mentor/lessons/${lessonId}`);
        showToast.success("The lesson was deleted successfully!");

        // Remove the deleted lesson from the state
        setData((prevLessons) =>
          prevLessons.filter((lesson) => lesson.id !== lessonId)
        );

        // Adjust the current page if necessary
        if (data.length === 1 && currentPage > 1) {
          handlePageChange(currentPage - 1);
        }
      } catch (error: any) {
        showToast.error(error.message);
      }
    }
  };

  return {
    currentPage,
    searchQuery,
    data,
    totalPages,
    loading,
    handlePageChange,
    handleSearchChange,
    handleDelete,
  };
}
