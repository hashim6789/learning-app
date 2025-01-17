import React from "react";
import useFetch from "../../../hooks/useFetch";
import MentorsTable from "../tables/MentorTable";

interface AdminMentorManagementProps {}

interface Mentor {
  id: string;
  name: string;
  email: string;
  status: "blocked" | "unblocked";
  profilePicture: string;
}

const AdminMentorManagement: React.FC<AdminMentorManagementProps> = () => {
  const { data, loading, error } = useFetch<any[] | null>(
    "http://localhost:3000/admin/mentors"
  );

  const mentors: Mentor[] = Array.isArray(data)
    ? data.map((item) => ({
        id: item.id,
        name: `${item.firstName} ${item.lastName || ""}`.trim(),
        email: item.email,
        status: item.isBlocked ? "blocked" : "unblocked",
        profilePicture: item.profilePicture || "",
      }))
    : [];

  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 mb-4 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading mentors details...
          </h2>
          <p className="text-gray-500 mt-2">
            Please wait while we fetch the information
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          {/* <div className="animate-spin h-12 w-12 mb-4 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div> */}
          <h2 className="text-xl font-bold text-red-800">
            error fetch mentors details...
          </h2>
          <p className="text-red-500 mt-2">Please try again (:</p>
        </div>
      </div>
    );
  }

  return <MentorsTable mentors={mentors} />;
};

export default AdminMentorManagement;
