import React from "react";

import LoadingComponent from "../LoadingComponent";
import useFetch from "../../../../hooks/useFetch";
import NoContentComponent from "../NoContentComponent";
import ErrorComponent from "../ErrorComponent";

interface IMeeting {
  _id: string;
  courseId: string;
  learnerId: string;
  roomId: string;
  slotId: string;
}

const ScheduledMeetingsTable: React.FC = () => {
  const { data: meetings, loading, error } = useFetch<IMeeting[]>("/api/meets");

  if (error) {
    return <ErrorComponent theme="purple" item="meetings" />;
  }
  if (loading) {
    return <LoadingComponent theme="purple" item="meetings" />;
  }
  if (!meetings || meetings.length === 0) {
    return <NoContentComponent theme="purple" item="meetings" />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Meeting ID</th>
            <th className="border border-gray-300 px-4 py-2">Course ID</th>
            <th className="border border-gray-300 px-4 py-2">Learner ID</th>
            <th className="border border-gray-300 px-4 py-2">Slot ID</th>
            <th className="border border-gray-300 px-4 py-2">Room ID</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting._id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">
                {meeting._id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {meeting.courseId}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {meeting.learnerId}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {meeting.slotId}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {meeting.roomId}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduledMeetingsTable;
