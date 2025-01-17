import React from "react";
import useMentor from "../../../hooks/useMentor";

interface Mentor {
  id: string;
  name: string;
  email: string;
  status: Status;
  profilePicture: string;
}

type Status = "blocked" | "unblocked";

interface MentorTableProps {
  mentors: Mentor[];
}

const MentorsTable: React.FC<MentorTableProps> = ({ mentors }) => {
  const {
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
  } = useMentor(mentors);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search mentors..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />

        {/* Filter Dropdown */}
        <select
          value={filterStatus}
          onChange={(e) =>
            handleFilterChange(
              e.target.value as "all" | "blocked" | "unblocked"
            )
          }
          className="ml-4 px-4 py-2 border rounded-md"
        >
          <option value="all">All</option>
          <option value="blocked">Blocked</option>
          <option value="unblocked">Unblocked</option>
        </select>
      </div>

      {/* Mentors Table */}
      <div className="bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b px-6 py-4 text-left text-sm font-medium text-gray-600">
                Account Status
              </th>
              <th className="border-b px-6 py-4 text-left text-sm font-medium text-gray-600">
                Mentor Name
              </th>
              <th className="border-b px-6 py-4 text-left text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="border-b px-6 py-4 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-sm text-gray-600"
                >
                  Loading mentors...
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((mentor) => (
                <tr key={mentor.id} className="border-b">
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        mentorStatus[mentor.id] === "blocked"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {mentorStatus[mentor.id]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={mentor.profilePicture}
                        alt="profile"
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
                  <td className="px-6 py-4 flex items-center gap-2">
                    <button
                      onClick={() => handleViewMentor(mentor.id)}
                      className="text-sm px-4 py-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleBlockUnblockWrapper(mentor.id)}
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
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-sm text-gray-600"
                >
                  No mentors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 text-sm rounded-md ${
                currentPage === index + 1
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MentorsTable;
