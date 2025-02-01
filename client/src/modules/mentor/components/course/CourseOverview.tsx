import React, { useState } from "react";
import { BookOpen, ChevronDown, Clock, Edit } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { editCourse } from "../../../store/slices/courseSlice";
import useFetch from "../../../hooks/useFetch";
import { Category } from "../../../shared/types/Category";
import { Course } from "../../../shared/types/Course";
import { updateCourse } from "../../../store/thunks/course/updateCourse";
import { showToast } from "../../../shared/utils/toastUtils";

const CourseOverview: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { course } = useSelector((state: RootState) => state.course);

  const [isEditing, setIsEditing] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  // Fetch categories
  const { data: categoryData } = useFetch<Category[]>("/mentor/categories");

  const categories: Category[] = categoryData
    ? categoryData.map((item) => ({
        id: item.id,
        title: item.title.trim(),
        status: item.isListed ? "listed" : "unlisted",
        isListed: item.isListed,
      }))
    : [];

  // Handle form field changes using Redux dispatch
  const handleChange = (field: keyof Course, value: any) => {
    dispatch(editCourse({ [field]: value }));
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      if (!course) return null;
      const resultAction = await dispatch(
        updateCourse({
          data: { ...course, categoryId: course.category.id },
          user: "mentor",
        })
      );
      if (updateCourse.fulfilled.match(resultAction)) {
        showToast.success("The course updated successfully.");
      } else {
        showToast.error("The course updated Failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-purple-800">Course Overview</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-purple-600 flex items-center space-x-2"
        >
          <Edit />
          <span>{isEditing ? "Cancel" : "Edit"}</span>
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <input
            className="w-full px-4 py-2 border border-purple-400 rounded-lg"
            value={course?.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <textarea
            className="w-full px-4 py-2 border border-purple-400 rounded-lg"
            value={course?.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          ></textarea>

          <div className="relative">
            <div
              className="w-full px-4 py-2 border border-purple-400 rounded-lg flex justify-between items-center cursor-pointer"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <span>
                {categories.find((cat) => cat.id === course?.category?.id)
                  ?.title || "Select Course Category"}
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isSelectOpen ? "rotate-180" : ""
                } text-purple-500`}
              />
            </div>
            {isSelectOpen && (
              <div className="absolute w-full mt-1 bg-white border border-purple-400 rounded-lg shadow-lg z-10">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="px-4 py-2 hover:bg-purple-100 cursor-pointer text-purple-700"
                    onClick={() => {
                      handleChange("category", category);
                      setIsSelectOpen(false);
                    }}
                  >
                    {category.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* <input
            type="file"
            className="w-full px-4 py-2 border border-purple-400 rounded-lg"
            onChange={(e) =>
              handleChange("thumbnail", e.target.files?.[0]?.name || "")
            }
          /> */}

          <button
            onClick={handleSave}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <>
          <p className="text-gray-700 mb-6">{course?.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 bg-purple-50 p-4 rounded-lg">
              <BookOpen className="text-purple-600" />
              <div>
                <p className="font-semibold text-purple-800">Total Lessons</p>
                <p className="text-gray-600">
                  {course?.lessons?.length} Lessons
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-purple-50 p-4 rounded-lg">
              <Clock className="text-purple-600" />
              <div>
                <p className="font-semibold text-purple-800">Total Duration</p>
                <p className="text-gray-600">50 minutes</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseOverview;
