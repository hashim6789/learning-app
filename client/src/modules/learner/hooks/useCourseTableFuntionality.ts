import { useState, useEffect } from "react";
import { Course } from "../../../shared/types/Course";
import api from "../../../shared/utils/api";
import useCourseManagement from "../../../hooks/useCourseManagement";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface UseCourseTableFunctionalityOptions {
  itemsPerPage: number;
}

type Sort = "sortAscPrice";

export function useCourseTableFunctionality({
  itemsPerPage,
}: UseCourseTableFunctionalityOptions) {
  const { deleteCourse } = useCourseManagement();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategpry] = useState("all");
  const [range, setRange] = useState("all");
  const [sort, setSort] = useState<"ASC" | "DEC">("ASC");

  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const auth = isAuthenticated ? "" : "/no-auth";
        const response = await api.get(
          `/api${auth}/courses?category=${category}&range=${range}&search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}&sort=${sort}`
        );
        const result = response.data;
        setData(result.data);
        console.log(result);
        setTotalPages(Math.ceil(result.docCount / itemsPerPage));
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
    category,
    range,
    sort,
    data,
    totalPages,
    loading,
    handlePageChange,
    handleSearchChange,
    handleDelete,
  };
}
