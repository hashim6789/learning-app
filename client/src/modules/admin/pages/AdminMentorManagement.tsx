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
    return <div className="p-6">Loading mentors...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return <MentorsTable mentors={mentors} />;
};

export default AdminMentorManagement;
