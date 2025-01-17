import LearnersTable from "../tables/LearnerTable";
import useFetch from "../../../hooks/useFetch";

interface Props {}

interface Learner {
  id: string;
  name: string;
  email: string;
  status: "blocked" | "unblocked";
  profilePicture: string;
}

const AdminLearnerManagement: React.FC<Props> = ({}) => {
  const {
    data,
    loading: learnersLoading,
    error: learnersError,
  } = useFetch<any[] | null>("http://localhost:3000/admin/learners");

  const learners: Learner[] = Array.isArray(data)
    ? data.map((item) => ({
        id: item.id,
        name: `${item.firstName} ${item.lastName || ""}`.trim(),
        email: item.email,
        status: item.isBlocked ? "blocked" : "unblocked",
        profilePicture: item.profilePicture || "",
      }))
    : [];

  console.log("learners", data);

  if (learnersLoading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 mb-4 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading learner details...
          </h2>
          <p className="text-gray-500 mt-2">
            Please wait while we fetch the information
          </p>
        </div>
      </div>
    );
  }

  if (learnersError) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          {/* <div className="animate-spin h-12 w-12 mb-4 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div> */}
          <h2 className="text-xl font-bold text-red-800">
            error fetch learner details...
          </h2>
          <p className="text-red-500 mt-2">Please try again (:</p>
        </div>
      </div>
    );
  }
  if (data && data.length === 0) {
    return <div className="p-6 text-red-500">No learners exists!</div>;
  }
  return (
    <div>
      <LearnersTable learners={learners as Learner[]} />
    </div>
  );
};

export default AdminLearnerManagement;
