import { useState } from "react";
import useBlockUnblock from "./useBlockUnblock";
import { useTableFunctionality } from "./useTable";
import { useNavigate } from "react-router-dom";

interface Mentor {
  id: string;
  name: string;
  email: string;
  status: Status;
  profilePicture: string;
}

type Status = "blocked" | "unblocked";

const useMentor = (mentors: Mentor[]) => {
  const { handleBlockUnblock, isLoading } = useBlockUnblock();
  const navigate = useNavigate();

  const [mentorStatus, setMentorStatus] = useState<{ [key: string]: Status }>(
    mentors.reduce((acc, mentor) => {
      acc[mentor.id] = mentor.status;
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
  } = useTableFunctionality<Mentor>({
    data: mentors,
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

  const handleViewMentor = (mentorId: string) => {
    navigate(`/admin/mentors/${mentorId}`);
    console.log(mentorId, "mentor");
  };

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
