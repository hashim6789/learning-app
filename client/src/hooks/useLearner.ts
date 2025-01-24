import { useState } from "react";
import useBlockUnblock from "./useBlockUnblock";
import { useTableFunctionality } from "./useTable";
import { useNavigate } from "react-router-dom";
import { Learner } from "../shared/types/Learner";
import { UserStatus } from "../shared/types/UserStatus";

const useLearner = (learners: Learner[]) => {
  const { handleBlockUnblock, isLoading } = useBlockUnblock();
  const navigate = useNavigate();

  const [learnerStatus, setLearnerStatus] = useState<{
    [key: string]: UserStatus;
  }>(
    learners.reduce(
      (acc, learner) => ({ ...acc, [learner.id]: learner.status }),
      {}
    )
  );

  const updatedLearners = learners.map((learner) => ({
    ...learner,
    status: learnerStatus[learner.id],
  }));

  const {
    currentPage,
    searchQuery,
    filterStatus,
    paginatedData,
    totalPages,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
  } = useTableFunctionality<Learner>({
    data: updatedLearners,
    itemsPerPage: 10,
    filterField: "name",
  });

  const handleBlockUnblockWrapper = async (learnerId: string) => {
    try {
      const newStatus =
        learnerStatus[learnerId] === "blocked" ? "unblocked" : "blocked";
      await handleBlockUnblock(learnerId, "learner", learnerStatus[learnerId]);
      setLearnerStatus((prevState) => ({
        ...prevState,
        [learnerId]: newStatus,
      }));
    } catch (error) {
      console.error("Failed to block/unblock learner:", error);
    }
  };

  const handleViewLearner = (learnerId: string) =>
    navigate(`/admin/learners/${learnerId}`);

  return {
    isLoading,
    learnerStatus,
    currentPage,
    searchQuery,
    filterStatus,
    paginatedData,
    totalPages,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleBlockUnblockWrapper,
    handleViewLearner,
  };
};

export default useLearner;
