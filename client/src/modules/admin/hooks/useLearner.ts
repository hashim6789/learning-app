import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBlockUnblock from "../../../hooks/useBlockUnblock";
import { Learner } from "../../../shared/types/Learner";
import { UserStatus } from "../../../shared/types/UserStatus";
import api from "../../../shared/utils/api"; // Assuming you have an API utility
import { showToast } from "../../../shared/utils/toastUtils";
import Swal from "sweetalert2";

interface UseTableFunctionalityOptions {
  itemsPerPage: number;
}

const useLearner = ({ itemsPerPage }: UseTableFunctionalityOptions) => {
  const { handleBlockUnblock, isLoading } = useBlockUnblock();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | UserStatus>("all");
  const [data, setData] = useState<Learner[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/api/learners?status=${filterStatus}&search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const result = response.data;
        console.log(result);

        console.log(data, data);

        const learners: Learner[] = Array.isArray(data)
          ? result.data.map((item: any) => ({
              id: item.id,
              name: `${item.firstName} ${item.lastName || ""}`.trim(),
              email: item.email,
              status: item.isBlocked ? "blocked" : "unblocked",
              profilePicture: item.profilePicture || "",
            }))
          : [];
        setData(learners);

        setTotalPages(Math.ceil(result.docCount / itemsPerPage));
      } catch (error) {
        console.error("Error fetching learners:", error);
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

  const handleBlockUnblockWrapper = async (learnerId: string) => {
    try {
      const newStatus =
        data.find((learner) => learner.id === learnerId)?.status === "blocked"
          ? "unblocked"
          : "blocked";
      const result = await handleBlockUnblock(learnerId, "learner", newStatus);
      if (result) {
        setData((prevState) =>
          prevState.map((learner) =>
            learner.id === learnerId
              ? { ...learner, status: newStatus }
              : learner
          )
        );
        showToast.success(
          `Learner ${
            newStatus === "blocked" ? "blocked" : "unblocked"
          } successfully!`
        );
      }
    } catch (error) {
      console.error("Failed to block/unblock learner:", error);
      showToast.error("Failed to block/unblock learner.");
    }
  };

  const handleViewLearner = (learnerId: string) =>
    navigate(`/api/learners/${learnerId}`);

  const handleDeleteLearner = async (learnerId: string) => {
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
        await api.delete(`/api/learners/${learnerId}`);
        showToast.success("Learner deleted successfully!");
        setData((prevLearners) =>
          prevLearners.filter((learner) => learner.id !== learnerId)
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
    learnerStatus: data.map((learner) => learner.status), // Optional if required
    filterStatus,
    isLoading,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleViewLearner,
    handleDeleteLearner,
    handleBlockUnblockWrapper,
  };
};

export default useLearner;
