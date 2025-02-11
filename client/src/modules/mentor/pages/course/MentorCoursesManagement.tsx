import { useNavigate } from "react-router-dom";
import CourseTable from "../../tables/CourseTable";
import Breadcrumbs from "../../components/BreadCrumbs";
import { Path } from "../../../../shared/types/Path";

// Breadcrumb Component
const paths: Path[] = [{ title: "my courses", link: "/mentor/my-courses" }];

const MentorCoursesManagement = () => {
  const navigate = useNavigate();

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

      <CourseTable />
    </div>
  );
};

export default MentorCoursesManagement;
