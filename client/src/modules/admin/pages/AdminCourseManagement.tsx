import React from "react";
import useFetch from "../../../hooks/useFetch";
import CoursesTable from "../tables/CourseTable";

interface AdminCourseManagementProps {}

interface Course {
  id: string;
  title: string;
  category: string;
  status: "Approved" | "Rejected" | "Pending" | "Draft";
  thumbnail: string;
}

const AdminCourseManagement: React.FC<AdminCourseManagementProps> = () => {
  const { data, loading, error } = useFetch<any[] | null>(
    "http://localhost:3000/admin/courses"
  );

  const courses: Course[] = Array.isArray(data)
    ? data.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        status: item.status,
        thumbnail: item.thumbnail || "",
      }))
    : [];

  if (loading) {
    return <div className="p-6">Loading courses...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return <CoursesTable courses={courses} />;
};

export default AdminCourseManagement;
