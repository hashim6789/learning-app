import React, { useState } from "react";
import { Search } from "lucide-react";
import useBlockUnblock from "../../../hooks/useBlockUnblock";
import userImage from "../../../assets/img/user_image.avif";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";

const MySwal = withReactContent(Swal);

interface Learner {
  id: string;
  name: string;
  email: string;
  status: Status;
  profilePicture: string;
}

type Status = "blocked" | "unblocked";

interface LearnerTableProps {
  learners: Learner[];
}

const LearnersTable: React.FC<LearnerTableProps> = ({ learners }) => {
  const { blockUnblock } = useBlockUnblock();

  const [learnerStatus, setLearnerStatus] = useState<{ [key: string]: Status }>(
    learners.reduce((acc, learner) => {
      acc[learner.id] = learner.status;
      return acc;
    }, {} as { [key: string]: Status })
  );

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "blocked" | "unblocked"
  >("all");

  // Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Set the number of learners per page

  const handleBlockUnblock = async (
    learnerId: string,
    currentStatus: "blocked" | "unblocked"
  ) => {
    try {
      const action = currentStatus === "blocked" ? "unblock" : "block";
      const result = await MySwal.fire({
        title: `Are you sure you want to ${action} this learner?`,
        text: `This action will ${action}.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: currentStatus === "blocked" ? "#3085d6" : "#d33",
        cancelButtonColor: "#aaa",
        confirmButtonText: `Yes, ${action}`,
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await blockUnblock(learnerId, "learner", currentStatus);

        setLearnerStatus((prevStatus) => ({
          ...prevStatus,
          [learnerId]: currentStatus === "blocked" ? "unblocked" : "blocked",
        }));

        toast.success(`Learner successfully ${action}ed.`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.info("Action cancelled.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error("Error in block/unblock operation", err);
      toast.error("Failed to update learner status. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Filtered learners
  const filteredLearners = learners.filter((learner) => {
    const matchesStatus =
      filterStatus === "all" || learnerStatus[learner.id] === filterStatus;
    const matchesSearch = learner.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Paginate learners based on current page and items per page
  const paginatedLearners = filteredLearners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredLearners.length / itemsPerPage);

  // Change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-800">Learners</h2>
          <span className="text-sm text-gray-500">{learners.length} Users</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-80">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">filter by</span>
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
                Learner Name
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
            {paginatedLearners.length > 0 ? (
              paginatedLearners.map((learner) => (
                <tr
                  key={learner.id}
                  id={learner.id}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        learnerStatus[learner.id] === "blocked"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {learnerStatus[learner.id] === "blocked"
                        ? "Blocked"
                        : "Unblocked"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={learner.profilePicture || userImage}
                        alt="profilePicture"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium">
                        {learner.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {learner.email}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          handleBlockUnblock(
                            learner.id,
                            learnerStatus[learner.id]
                          )
                        }
                        className={`text-sm px-4 py-2 rounded-md ${
                          learnerStatus[learner.id] === "blocked"
                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                            : "bg-green-100 text-green-600 hover:bg-green-200"
                        }`}
                      >
                        {learnerStatus[learner.id] === "blocked"
                          ? "Unblock"
                          : "Block"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No learners found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-600 border rounded-md hover:bg-gray-100"
        >
          Previous
        </button>
        <div className="flex gap-2">
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page + 1)}
              className={`px-4 py-2 text-sm font-medium text-gray-600 border rounded-md ${
                currentPage === page + 1
                  ? "bg-purple-100 text-purple-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {page + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-600 border rounded-md hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LearnersTable;
