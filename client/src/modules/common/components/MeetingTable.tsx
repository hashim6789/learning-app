import React, { useState } from "react";
import { format } from "date-fns";
import { formatTo12HourTime } from "../../../shared/utils/date";
import LoadingComponent from "../../mentor/components/LoadingComponent";
import useFetch from "../../../hooks/useFetch";
import NoContentComponent from "../../mentor/components/NoContentComponent";
import ErrorComponent from "../../mentor/components/ErrorComponent";
import { useNavigate } from "react-router-dom";

interface IMeeting {
  id: string;
  course: { _id: string; title: string };
  learner: { firstName: string; lastName: string };
  mentor: { firstName: string; lastName: string };
  roomId: string;
  slot: { dateTime: string };
}

interface Props {
  role: "mentor" | "learner";
}

const ScheduledMeetingsTable: React.FC<Props> = ({ role }) => {
  const navigate = useNavigate();
  const { data: meetings, loading, error } = useFetch<IMeeting[]>("/api/meets");
  const [searchTerm, setSearchTerm] = useState("");

  if (error) {
    return <ErrorComponent theme="purple" item="meetings" />;
  }

  if (loading) {
    return <LoadingComponent theme="purple" item="meetings" />;
  }

  if (!meetings || meetings.length === 0) {
    return <NoContentComponent theme="purple" item="meetings" />;
  }

  const filteredMeetings = meetings.filter(
    (meeting) =>
      meeting.course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${meeting.learner.firstName} ${meeting.learner.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateTime: string) => {
    try {
      const date = new Date(dateTime);
      return format(date, "MMM dd, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  const handleStartCall = (roomId: string) => {
    const action = role === "mentor" ? "offer" : "answer";
    navigate(`/${role}/${action}/${roomId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Scheduled Meetings
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by course or learner..."
            className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute right-3 top-3 h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {filteredMeetings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No meetings match your search criteria
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Learner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMeetings.map((meeting) => (
                <tr
                  key={meeting.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {meeting.course.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: {meeting.course._id.substring(0, 8)}...
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{`${meeting.learner.firstName} ${meeting.learner.lastName}`}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(meeting.slot.dateTime)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatTo12HourTime(meeting.slot.dateTime)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleStartCall(meeting.roomId)}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Start Call
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredMeetings.length} of {meetings.length} meetings
      </div>
    </div>
  );
};

export default ScheduledMeetingsTable;
