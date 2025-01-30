import React, { useEffect, useState } from "react";
import {
  Clock,
  Plus,
  Search,
  Book,
  MoreVertical,
  Edit,
  Trash2,
  ChevronRight,
} from "lucide-react";

import { Lesson } from "../../../../shared/types/Lesson";
// import { sampleLessons } from "../../../shared/sample/sampleLessons";
import api from "../../../../shared/utils/api";
import { config } from "../../../../shared/configs/config";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../../shared/utils/toastUtils";

const MentorLessonManagement: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`${config.API_BASE_URL}/mentor/lessons`);
      if (!response.data) throw new Error("Failed to fetch lessons");
      const data = response.data.data;
      setLessons(data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (lessonId: string) => {
    try {
      const response = await api.delete(
        `${config.API_BASE_URL}/mentor/lessons/${lessonId}`
      );
      if (response && response.status === 200 && response.data) {
        showToast.success(response.data.message);
        const filteredLessons = lessons.filter(
          (lesson) => lesson.id !== lessonId
        );
        setLessons(filteredLessons);
      } else {
        showToast.error(response.data.message);
      }
    } catch (error: any) {
      showToast.error(error.message);
      console.error(error);
    }
  };

  const LessonCard: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                {lesson.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {lesson.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{lesson.duration || 0} minutes</span>
                </div>
                <div className="flex items-center">
                  <Book className="w-4 h-4 mr-1" />
                  <span>{lesson.materials.length} materials</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-purple-50 rounded-full"
              >
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                  <button
                    onClick={() => {
                      navigate(`/mentor/my-lessons/${lesson.id}`);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Lesson
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(lesson.id);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Lesson
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-purple-50 rounded-b-lg">
          <button
            // onClick={() => setSelectedLesson(lesson.id)}
            onClick={() => navigate(`/mentor/my-lessons/${lesson.id}`)}
            className="flex items-center text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-purple-900">
              Lesson Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and organize your course lessons
            </p>
          </div>
          <button
            onClick={() => navigate("/mentor/my-lessons/create")}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Lesson
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.length > 0 ? (
              filteredLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchQuery
                    ? "No lessons found matching your search"
                    : "No lessons created yet"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorLessonManagement;
