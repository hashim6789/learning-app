import { useNavigate } from "react-router-dom";
import CourseTable from "../tables/CourseTable";
import Breadcrumbs from "../components/BreadCrumbs";
import useFetch from "../../../hooks/useFetch";
import { config } from "../../../shared/configs/config";
import { Path } from "../../../shared/types/Path";

type Status = "Approved" | "Rejected" | "Pending" | "Draft";
interface Category {
  id: string;
  title: string;
  isListed: boolean;
}
interface Course {
  id: string;
  status: Status;
  title: string;
  category: Category;
  thumbnail: string;
}

// Breadcrumb Component
const paths: Path[] = [{ title: "my courses", link: "/mentor/my-courses" }];

const MentorCoursesManagement = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch<Course[]>(
    `${config.API_BASE_URL}/mentor/courses`
  );

  const courses: Course[] = Array.isArray(data)
    ? data.map((item) => ({
        id: item.id,
        title: `${item.title}`.trim(),
        status: item.status as Status,
        thumbnail: item.thumbnail || "",
        category: item.category,
      }))
    : [];

  console.log("courses =", courses);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <Breadcrumbs paths={paths} />
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded mb-6"
          onClick={() => navigate("/mentor/courses/create")}
        >
          Create New Course
        </button>
        <div className="h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 mb-4 border-4 border-purple border-t-transparent rounded-full mx-auto"></div>
            <h2 className="text-xl font-semibold text-purple">
              Loading course details...
            </h2>
            <p className="text-gray-500 mt-2">
              Please wait while we fetch the courses
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <Breadcrumbs paths={paths} />
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded mb-6"
          onClick={() => navigate("/mentor/courses/create")}
        >
          Create New Course
        </button>
        <div className="h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-800">
              Error fetching course details...
            </h2>
            <p className="text-red-500 mt-2">Please try again (:</p>
          </div>
        </div>
      </div>
    );
  }

  // No courses found state
  if (courses.length === 0) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <Breadcrumbs paths={paths} />
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded mb-6"
          onClick={() => navigate("/mentor/courses/create")}
        >
          Create New Course
        </button>
        <div className="p-6 text-purple">No courses available!</div>
      </div>
    );
  }

  // Render courses table
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Breadcrumbs paths={paths} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple">My Courses</h1>
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded"
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
