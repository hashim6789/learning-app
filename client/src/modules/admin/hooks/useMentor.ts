import { useState } from "react";
import useBlockUnblock from "../../../hooks/useBlockUnblock";
import { useTableFunctionality } from "../../../hooks/useTable";
import { useNavigate } from "react-router-dom";
import { Mentor } from "../../../shared/types/Mentor";
import { UserStatus } from "../../../shared/types/UserStatus";

const useMentor = (mentors: Mentor[]) => {
  const { handleBlockUnblock, isLoading } = useBlockUnblock();
  const navigate = useNavigate();

  const [mentorStatus, setMentorStatus] = useState<{
    [key: string]: UserStatus;
  }>(
    mentors.reduce(
      (acc, mentor) => ({ ...acc, [mentor.id]: mentor.status }),
      {}
    )
  );

  const updatedMentors = mentors.map((mentor) => ({
    ...mentor,
    status: mentorStatus[mentor.id],
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
  } = useTableFunctionality<Mentor>({
    data: updatedMentors,
    itemsPerPage: 5,
    filterField: "name",
  });

  const handleBlockUnblockWrapper = async (mentorId: string) => {
    try {
      const newStatus =
        mentorStatus[mentorId] === "blocked" ? "unblocked" : "blocked";
      await handleBlockUnblock(mentorId, "mentor", mentorStatus[mentorId]);
      setMentorStatus((prevState) => ({
        ...prevState,
        [mentorId]: newStatus,
      }));
    } catch (error) {
      console.error("Failed to block/unblock mentor:", error);
    }
  };

  const handleViewMentor = (mentorId: string) =>
    navigate(`/admin/mentors/${mentorId}`);

  return {
    isLoading,
    mentorStatus,
    currentPage,
    searchQuery,
    filterStatus,
    paginatedData,
    totalPages,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleBlockUnblockWrapper,
    handleViewMentor,
  };
};

export default useMentor;
