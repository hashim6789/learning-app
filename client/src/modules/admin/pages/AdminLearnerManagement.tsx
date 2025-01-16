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
  const { data, loading, error } = useFetch<any[] | null>(
    "http://localhost:3000/admin/learners"
  );

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

  if (loading) {
    return <div className="p-6">Loading learners...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
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
