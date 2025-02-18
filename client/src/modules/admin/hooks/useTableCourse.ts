import { useState, useMemo, useEffect } from "react";
import api from "../../../shared/utils/api";
import { showToast } from "../../../shared/utils/toastUtils";
import Swal from "sweetalert2";
import { Course } from "../../../shared/types/Course";
import { CourseStatus } from "../../mentor/pages/MentorDashboard";

interface UseCourseTableFunctionalityOptions {
  itemsPerPage: number;
}

export function useCourseTableFunctionality({
  itemsPerPage,
}: UseCourseTableFunctionalityOptions) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilterType, setCourseFilterType] = useState<
    CourseStatus | "all"
  >("all");
  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/api/courses?type=${courseFilterType}&search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const result = response.data;
        setData(result.data);
        setTotalPages(Math.ceil(result.docCount / itemsPerPage));
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchData, 500); // Debounce effect
    return () => clearTimeout(debounceTimeout);
  }, [courseFilterType, searchQuery, currentPage, itemsPerPage]);

  //   const filteredData = useMemo(() => {
  //     return data.filter((item) => {
  //       return String(item[filterField])
  //         .toLowerCase()
  //         .includes(searchQuery.toLowerCase());
  //     });
  //   }, [data, searchQuery, filterField]);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  const handleFilterChange = (status: CourseStatus | "all") => {
    setCourseFilterType(status);
    setCurrentPage(1);
  };

  const handleDelete = async (courseId: string) => {
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
        await api.delete(`/api/courses/${courseId}`);
        showToast.success("The lesson was deleted successfully!");
        setData((prevCourses) =>
          prevCourses.filter((course) => course.id !== courseId)
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
    courseFilterType,
    data,
    totalPages,
    loading,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleDelete,
  };
}
