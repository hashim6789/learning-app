import { useState, useMemo } from "react";
import { IMaterial, MaterialType } from "../../../shared/types/Material";

export function useTableFunctionalityOfMaterial(
  data: IMaterial[],
  itemsPerPage: number
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | MaterialType>("all");

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesStatus =
        filterStatus === "all" || (item as any).type === filterStatus;
      const matchesSearch = String(item["title"])
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [data, filterStatus, searchQuery, "type"]);

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
  const handleFilterChange = (status: "all" | MaterialType) => {
    console.log(status);
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
