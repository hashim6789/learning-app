import React, { useState } from "react";
import { CheckCircle2, PlayCircle, Plus } from "lucide-react";
import { Lesson } from "../../../../shared/types/Lesson";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { setLesson } from "../../../../store/slices/lessonsSlice";

const CourseLessons: React.FC<{
  lessons: Omit<Lesson, "materials">[];
}> = ({ lessons }) => {
  const dispatch = useDispatch<AppDispatch>();
  const lesson = useSelector((state: RootState) => state.lesson.lesson);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: lesson?.title || "",
    duration: lesson?.duration?.toString() || "",
    description: lesson?.description || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLesson: Omit<Lesson, "materials"> = {
      id: "",
      title: formData.title,
      duration: parseInt(formData.duration, 10),
      description: formData.description,
    };

    dispatch(setLesson(newLesson)); // Dispatch to Redux
    setFormData({ title: "", duration: "", description: "" }); // Reset form
    setShowForm(false); // Hide form
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-purple-800">Course Lessons</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Lesson
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <input
                type="text"
                name="title"
                placeholder="Lesson Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="number"
                name="duration"
                placeholder="Duration (minutes)"
                value={formData.duration}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Lesson
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ title: "", duration: "", description: "" });
                }}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {lessons.map((lesson, index) => (
        <div
          key={lesson.id}
          className="flex items-center justify-between bg-purple-50 p-4 rounded-lg"
        >
          <div className="flex items-center space-x-4">
            <span className="text-purple-600 font-bold">{index + 1}.</span>
            <div>
              <p className="font-semibold text-purple-800">{lesson.title}</p>
              <p className="text-gray-600">{lesson.duration} minutes</p>
              <p className="text-gray-600">{lesson.description}</p>
            </div>
          </div>
          {lesson.isCompleted ? (
            <CheckCircle2 className="text-green-500" />
          ) : (
            <PlayCircle className="text-purple-600" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseLessons;
