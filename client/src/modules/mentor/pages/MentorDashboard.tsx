"use client";

import { error } from "console";
import type React from "react";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import api from "../../../shared/utils/api";

export type CourseStatus =
  | "approved"
  | "rejected"
  | "completed"
  | "requested"
  | "published"
  | "draft";

interface CourseStatusData {
  status: CourseStatus;
  count: number;
}

const COLORS = {
  approved: "#8B5CF6",
  rejected: "#EF4444",
  completed: "#10B981",
  requested: "#F59E0B",
  published: "#3B82F6",
  draft: "#6B7280",
};

const MentorDashboard: React.FC = () => {
  const [courseStatuses, setCourseStatuses] = useState<CourseStatusData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/api/analysis/mentors/67971495a41657d403187898/courses`
        );

        if (response && response.status === 200) {
          setCourseStatuses(response.data.data);
        }
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  // This is dummy data. Replace it with actual data from your state or API
  // const courseStatusData: CourseStatusData[] = [
  //   { status: "approved", count: 10 },
  //   { status: "rejected", count: 2 },
  //   { status: "completed", count: 15 },
  //   { status: "requested", count: 5 },
  //   { status: "published", count: 20 },
  //   { status: "draft", count: 8 },
  // ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-purple-800">Mentor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">
            Course Status Distribution
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseStatuses}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="status"
                  label={({ percent, name }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  filter="status"
                >
                  {courseStatuses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.status]} />
                  ))}
                </Pie>

                {/* Custom Tooltip */}
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border rounded shadow-md">
                          <p className="text-gray-700 font-semibold">
                            {payload[0].name}: {payload[0].value} courses
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* Legend */}
                <Legend verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Other Chart</h2>
          <div className="h-[300px] bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Place for another chart</p>
          </div>
        </div> */}
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Additional Chart 1</h2>
        <div className="h-[300px] bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Place for additional chart</p>
        </div>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Additional Chart 2</h2>
        <div className="h-[300px] bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Place for additional chart</p>
        </div>
        </div>
        </div> */}
    </div>
  );
};

export default MentorDashboard;
