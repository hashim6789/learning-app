import React, { useState } from "react";
import { Search } from "lucide-react";
import Swal from "sweetalert2";
import useBlockUnblock from "../../../hooks/useBlockUnblock";
import useImage from "../../../assets/img/user_image.avif";

interface Mentor {
  id: string;
  name: string;
  email: string;
  status: "blocked" | "unblocked";
  profilePicture: string;
}

interface MentorTableProps {
  mentors: Mentor[];
}

const MentorsTable: React.FC<MentorTableProps> = ({ mentors }) => {
  const { blockUnblock } = useBlockUnblock();

  const [mentorStatus, setMentorStatus] = useState<{
    [key: string]: "blocked" | "unblocked";
  }>(
    mentors.reduce((acc, mentor) => {
      acc[mentor.id] = mentor.status;
      return acc;
    }, {} as { [key: string]: "blocked" | "unblocked" })
  );

  const [filterStatus, setFilterStatus] = useState<
    "all" | "blocked" | "unblocked"
  >("all");

  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleBlockUnblock = async (
    mentorId: string,
    currentStatus: "blocked" | "unblocked"
  ) => {
    const action = currentStatus === "blocked" ? "unblock" : "block";
    const confirmText = currentStatus === "blocked" ? "Unblocked" : "Blocked";
    const confirmColor = currentStatus === "blocked" ? "#28a745" : "#dc3545";

    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this mentor?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}!`,
      confirmButtonColor: confirmColor,
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await blockUnblock(mentorId, "mentor", currentStatus);

        setMentorStatus((prevStatus) => ({
          ...prevStatus,
          [mentorId]: currentStatus === "blocked" ? "unblocked" : "blocked",
        }));

        Swal.fire({
          title: `Mentor ${confirmText} successfully!`,
          icon: "success",
          confirmButtonColor: confirmColor,
        });
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#dc3545",
        });
      }
    }
  };

  const filteredMentors = mentors.filter((mentor) => {
    const matchesStatus =
      filterStatus === "all" || mentorStatus[mentor.id] === filterStatus;
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Get the mentors for the current page
  const indexOfLastMentor = currentPage * itemsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - itemsPerPage;
  const currentMentors = filteredMentors.slice(
    indexOfFirstMentor,
    indexOfLastMentor
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredMentors.length / itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-800">Mentors</h2>
          <span className="text-sm text-gray-500">{mentors.length} Users</span>
        </div>
      </div>
      {/* Header and filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-80">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search name or email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filter by</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === "all"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("blocked")}
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === "blocked"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Blocked
            </button>
            <button
              onClick={() => setFilterStatus("unblocked")}
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === "unblocked"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Unblocked
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Account Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Mentor Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentMentors.length > 0 ? (
              currentMentors.map((mentor) => (
                <tr
                  key={mentor.id}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        mentorStatus[mentor.id] === "blocked"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {mentorStatus[mentor.id] === "blocked"
                        ? "Blocked"
                        : "Unblocked"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={mentor.profilePicture || useImage}
                        alt="profilePicture"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-800">
                        {mentor.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {mentor.email}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleBlockUnblock(mentor.id, mentorStatus[mentor.id])
                      }
                      className={`text-sm px-4 py-2 rounded-md ${
                        mentorStatus[mentor.id] === "blocked"
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                      }`}
                    >
                      {mentorStatus[mentor.id] === "blocked"
                        ? "Unblock"
                        : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-600">
                  No mentors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="p-4 border-t border-gray-200 flex justify-between">
          {/* Pagination buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  currentPage === index + 1
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorsTable;
