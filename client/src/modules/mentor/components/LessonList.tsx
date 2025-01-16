import React from "react";

interface Lesson {
  id: string;
  title: string;
  description: string;
}

interface LessonListProps {
  lessons: Lesson[];
  onEditLesson: (lessonId: string) => void;
  onDeleteLesson: (lessonId: string) => void;
}

const LessonList: React.FC<LessonListProps> = ({
  lessons,
  onEditLesson,
  onDeleteLesson,
}) => {
  return (
    <div>
      {lessons.length === 0 ? (
        <p>No lessons available for this course.</p>
      ) : (
        lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="border rounded-lg p-6 mb-4 bg-white shadow-md"
          >
            <h3 className="text-xl font-medium">{lesson.title}</h3>
            <p>{lesson.description}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => onEditLesson(lesson.id)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteLesson(lesson.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LessonList;
