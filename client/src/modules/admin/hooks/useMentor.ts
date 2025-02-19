//imported build-in hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//imported custom hooks
import useBlockUnblock from "../../../hooks/useBlockUnblock";
import { UserStatus } from "../../../shared/types/UserStatus";

//imported subclasses
import { Mentor } from "../../../shared/types/Mentor";

import api from "../../../shared/utils/api"; // Assuming you have an API utility
import { showToast } from "../../../shared/utils/toastUtils";
import Swal from "sweetalert2";

interface UseTableFunctionalityOptions {
  itemsPerPage: number;
}

const useMentor = ({ itemsPerPage }: UseTableFunctionalityOptions) => {
  const { handleBlockUnblock, isLoading } = useBlockUnblock();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | UserStatus>("all");
  const [data, setData] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/api/mentors?status=${filterStatus}&search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const result = response.data;
        console.log(result);

        console.log(data, data);

        const mentors: Mentor[] = Array.isArray(data)
          ? result.data.map((item: any) => ({
              id: item.id,
              name: `${item.firstName} ${item.lastName || ""}`.trim(),
              email: item.email,
              status: item.isBlocked ? "blocked" : "unblocked",
              profilePicture: item.profilePicture || "",
            }))
          : [];
        setData(mentors);

        setTotalPages(Math.ceil(result.docCount / itemsPerPage));
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchData, 500); // Debounce effect
    return () => clearTimeout(debounceTimeout);
  }, [filterStatus, searchQuery, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  const handleFilterChange = (status: "all" | UserStatus) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleBlockUnblockWrapper = async (mentorId: string) => {
    try {
      const newStatus =
        data.find((mentor) => mentor.id === mentorId)?.status === "blocked"
          ? "unblocked"
          : "blocked";
      const result = await handleBlockUnblock(mentorId, "mentor", newStatus);
      if (result) {
        setData((prevState) =>
          prevState.map((mentor) =>
            mentor.id === mentorId ? { ...mentor, status: newStatus } : mentor
          )
        );
        showToast.success(
          `Mentor ${
            newStatus === "blocked" ? "blocked" : "unblocked"
          } successfully!`
        );
      }
    } catch (error) {
      console.error("Failed to block/unblock mentor:", error);
      showToast.error("Failed to block/unblock mentor.");
    }
  };

  const handleViewMentor = (mentorId: string) =>
    navigate(`/api/mentors/${mentorId}`);

  const handleDeleteMentor = async (mentorId: string) => {
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
        await api.delete(`/api/mentors/${mentorId}`);
        showToast.success("Mentor deleted successfully!");
        setData((prevMentors) =>
          prevMentors.filter((mentor) => mentor.id !== mentorId)
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
    filterStatus,
    isLoading,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleViewMentor,
    handleDeleteMentor,
    handleBlockUnblockWrapper,
  };
};

export default useMentor;
