import { useState } from "react";
import { Lesson } from "../../../shared/types/Lesson";
import { Category } from "../../../shared/types/Category";

interface Course {
  id: string;
  status: "Approved" | "Rejected" | "Pending" | "Draft";
  title: string;
  category: Category;
  thumbnail: string;
  lessons: Lesson[];
  description: string;
}

interface CourseDetailsProps {
  course: Course;
  categories: { id: string; title: string }[];
  onUpdate: (
    courseId: string,
    updatedCourse: Pick<Course, "description" | "title"> & {
      category: string;
    }
  ) => Promise<void>;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({
  course,
  categories,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedCourse, setEditedCourse] = useState<Course>({ ...course });
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [courseCategory, setCourseCategory] = useState<string>(
    course.category.id
  );

  // Handle text input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedCourse({ ...editedCourse, [e.target.name]: e.target.value });
  };

  // Save changes to API
  const handleSave = async () => {
    try {
      const selectedCategory = categories.find(
        (cat) => cat.id === courseCategory
      );
      if (!selectedCategory) {
        console.error("Invalid category selected.");
        return;
      }
      await onUpdate(editedCourse.id, {
        description: editedCourse.description,
        title: editedCourse.title,
        category: selectedCategory.id,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="border rounded-lg p-6 mb-6 bg-white shadow-md">
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={editedCourse.title}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-lg mb-4"
            placeholder="Course Title"
          />

          <div className="relative">
            <div
              className="w-full px-4 py-2 border rounded-lg flex justify-between items-center cursor-pointer hover:border-gray-400"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <span className={courseCategory ? "text-black" : "text-gray-400"}>
                {categories.find((cat) => cat.id === courseCategory)?.title ||
                  "Select Course Category"}
              </span>
            </div>

            {isSelectOpen && (
              <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setCourseCategory(category.id);
                      setIsSelectOpen(false);
                    }}
                  >
                    {category.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          <textarea
            name="description"
            value={editedCourse.description}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-lg mb-4"
            placeholder="Course Description"
          />

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold">{course.title}</h2>
          <p className="text-gray-600">
            {categories.find((cat) => cat.id === course.category.id)?.title ||
              "No Category"}
          </p>
          <div className="flex items-center gap-4 mt-4">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <p className="font-medium">Status: {course.status}</p>
              <p className="font-medium">Description: {course.description}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default CourseDetails;
