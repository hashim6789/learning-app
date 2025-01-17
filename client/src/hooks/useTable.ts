import { useState, useMemo } from "react";

interface TableFunctionalityOptions<T> {
  data: T[];
  itemsPerPage: number;
  filterField: keyof T;
}

export function useTableFunctionality<T>({
  data,
  itemsPerPage,
  filterField,
}: TableFunctionalityOptions<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "blocked" | "unblocked"
  >("all");

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesStatus =
        filterStatus === "all" || (item as any).status === filterStatus;
      const matchesSearch = String(item[filterField])
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [data, filterStatus, searchQuery, filterField]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (status: "all" | "blocked" | "unblocked") => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  return {
    currentPage,
    searchQuery,
    filterStatus,
    paginatedData,
    totalPages,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
  };
}
