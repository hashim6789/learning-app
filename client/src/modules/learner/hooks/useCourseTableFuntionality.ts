import { useState, useEffect } from "react";
import { Course } from "../../../shared/types/Course";
import api from "../../../shared/utils/api";
import useCourseManagement from "../../../hooks/useCourseManagement";

interface UseCourseTableFunctionalityOptions {
  itemsPerPage: number;
}

export function useCourseTableFunctionality({
  itemsPerPage,
}: UseCourseTableFunctionalityOptions) {
  const { deleteCourse } = useCourseManagement();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/api/courses?search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const result = response.data;
        setData(result.data);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Error fetching courses:", error);
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

  const handleDelete = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
      setData(data.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error(error);
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
