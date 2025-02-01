import React from "react";
import useLesson from "../../../hooks/useLesson";

interface LessonStructureProps {
  courseId: string;
  onCancel: () => void;
}

const LessonStructure: React.FC<LessonStructureProps> = ({
  courseId,
  onCancel,
}) => {
  const { lesson, handleInputChange, resetLesson, validateLesson, addLesson } =
    useLesson(courseId);

  return (
    <div className="border rounded-lg p-4 space-y-4">
      {/* <h3 className="font-medium">Lesson {lessonNumber}</h3> */}
      <input
        placeholder="Lesson Title"
        value={lesson.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        className="border p-2 w-full"
      />
      <input
        placeholder="Lesson Description"
        value={lesson.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        className="border p-2 w-full"
      />
      <div className="flex gap-4">
        <button
          onClick={addLesson}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Save Lesson
        </button>
        <button
          onClick={() => {
            resetLesson();
            onCancel();
          }}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LessonStructure;
