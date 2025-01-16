import { useNavigate } from "react-router-dom";
import CourseTable from "../tables/CourseTable";
import useCourseManagement from "../../../hooks/useCourseManagement";
import useFetch from "../../../hooks/useFetch";

type Status = "Approved" | "Rejected" | "Pending" | "Draft";
interface Course {
  id: string;
  status: Status;
  title: string;
  category: string;
  thumbnail: string;
}

const MentorCoursesManagement = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch<Course[]>(
    "http://localhost:3000/mentor/courses"
  );

  const courses: Course[] = Array.isArray(data)
    ? data
        // .filter((item) => item.status !== "Draft")
        .map((item) => ({
          id: item.id,
          title: `${item.title}`.trim(),
          status: item.status as Status,
          thumbnail: item.thumbnail || "",
          category: item.category,
        }))
    : [];

  console.log("data =", data);

  if (loading) {
    return <div className="p-6">Loading mentors...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/mentor/courses/create")}
        >
          Create New Course
        </button>
      </div>

      <CourseTable courses={courses} />
    </div>
  );
};

export default MentorCoursesManagement;
