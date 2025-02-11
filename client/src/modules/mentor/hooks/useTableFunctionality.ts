import { useState, useMemo, useEffect } from "react";
import { IMaterial, MaterialType } from "../../../shared/types/Material";
import api from "../../../shared/utils/api";
import { showToast } from "../../../shared/utils/toastUtils";
import Swal from "sweetalert2";

interface UseMaterialTableFunctionalityOptions {
  itemsPerPage: number;
  filterField: keyof IMaterial;
}

export function useMaterialTableFunctionality({
  itemsPerPage,
  filterField,
}: UseMaterialTableFunctionalityOptions) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [materialFilterType, setMaterialFilterType] = useState<
    MaterialType | "all"
  >("all");
  const [data, setData] = useState<IMaterial[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/mentor/materials?type=${materialFilterType}&search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const result = response.data;
        setData(result.data);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchData, 500); // Debounce effect
    return () => clearTimeout(debounceTimeout);
  }, [materialFilterType, searchQuery, currentPage, itemsPerPage]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return String(item[filterField])
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [data, searchQuery, filterField]);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  const handleFilterChange = (status: MaterialType | "all") => {
    setMaterialFilterType(status);
    setCurrentPage(1);
  };

  const handleDelete = async (materialId: string) => {
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
        await api.delete(`/mentor/materials/${materialId}`);
        showToast.success("The lesson was deleted successfully!");
        setData((prevMaterials) =>
          prevMaterials.filter((material) => material.id !== materialId)
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
    materialFilterType,
    data,
    totalPages,
    loading,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleDelete,
  };
}
