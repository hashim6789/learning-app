import { useState, useMemo } from "react";
import { Course } from "../../../shared/types/Course";

import { CourseStatus } from "../../../shared/types/CourseStatus";
interface UseCourseTableFunctionalityOptions {
  data: Omit<Course, "lessons" | "description">[];
  itemsPerPage: number;
  filterField: keyof Omit<Course, "lessons" | "description">;
}

export function useCourseTableFunctionality({
  data,
  itemsPerPage,
  filterField,
}: UseCourseTableFunctionalityOptions) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilterStatus, setCourseFilterStatus] = useState<
    CourseStatus | "all"
  >("all");

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = String(item[filterField])
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesStatus =
        courseFilterStatus === "all" ||
        (item as any).status === courseFilterStatus;

      return matchesStatus && matchesSearch;
    });
  }, [data, courseFilterStatus, searchQuery, filterField]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (status: CourseStatus | "all") => {
    setCourseFilterStatus(status);
    setCurrentPage(1);
  };

  return {
    currentPage,
    searchQuery,
    courseFilterStatus,
    paginatedData,
    totalPages,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
  };
}
