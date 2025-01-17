import { useState } from "react";
import useBlockUnblock from "./useBlockUnblock";
import { useTableFunctionality } from "./useTable";

interface Learner {
  id: string;
  name: string;
  email: string;
  status: Status;
  profilePicture: string;
}

type Status = "blocked" | "unblocked";

const useLearner = (learners: Learner[]) => {
  const { handleBlockUnblock, isLoading } = useBlockUnblock();

  const [learnerStatus, setLearnerStatus] = useState<{ [key: string]: Status }>(
    learners.reduce((acc, learner) => {
      acc[learner.id] = learner.status;
      return acc;
    }, {} as { [key: string]: Status })
  );

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
    data: learners,
    itemsPerPage: 5,
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

  const handleViewLearner = (learnerId: string) => {
    console.log(learnerId, "learner");
  };

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
