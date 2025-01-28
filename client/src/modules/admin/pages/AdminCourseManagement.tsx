import React from "react";

//imported custom hooks
import useFetch from "../../../hooks/useFetch";

//imported child components
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
  const { data, loading, error } = useFetch<any[] | null>("/admin/courses");

  const courses: Course[] = Array.isArray(data)
    ? data.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        status: item.status,
        thumbnail: item.thumbnail || "",
      }))
    : [];

  //loading handling
  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 mb-4 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading courses details...
          </h2>
          <p className="text-gray-500 mt-2">
            Please wait while we fetch the information
          </p>
        </div>
      </div>
    );
  }

  //error handling
  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-800">
            error fetch courses details...
          </h2>
          <p className="text-red-500 mt-2">Please try again (:</p>
        </div>
      </div>
    );
  }

  //error handling (no courses found)
  if (data && data.length === 0) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-800">
            No Courses Available...
          </h2>
          <p className="text-red-500 mt-2">Unavailable data (:</p>
        </div>
      </div>
    );
  }

  return <CoursesTable courses={courses} />;
};

export default AdminCourseManagement;
