import { useState, useMemo } from "react";
import { Lesson } from "../../../shared/types/Lesson";

export function useTableFunctionalityOfLesson(
  data: Lesson[],
  itemsPerPage: number
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const searchData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = String(item["title"])
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [data, searchQuery]);

  console.log("search", searchData);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return searchData.slice(startIndex, startIndex + itemsPerPage);
  }, [searchData, currentPage, searchQuery, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleSearchChange = (query: string) => {
    console.log(searchQuery);
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return {
    currentPage,
    searchQuery,
    paginatedData,
    totalPages,
    handlePageChange,
    handleSearchChange,
  };
}
