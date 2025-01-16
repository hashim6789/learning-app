import { useState, useEffect } from "react";
import { Camera, ChevronDown } from "react-feather";
import useCourseManagement from "../../../hooks/useCourseManagement";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const host = "http://localhost:3000/mentor";
const MentorCreateCoursePage = () => {
  const { addCourse, loading, error, categories, fetchCategories } =
    useCourseManagement(host);
  console.log("categories :", categories);

  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseCategory, setCourseCategory] = useState<string | null>(null);
  const [courseThumbnail, setCourseThumbnail] = useState<string | null>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/mentor/upload/course-img",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { url } = response.data;
      setCourseThumbnail(url);
      toast.success("Image uploaded successfully!"); // Use Toastify for success
    } catch (error: any) {
      toast.error("Image upload failed"); // Use Toastify for errors
      console.error("Upload error:", error.message || error);
    }
  };

  const handleAddCourse = async () => {
    if (!courseTitle || !courseCategory || !courseDescription) {
      toast.error("Please fill out all fields."); // Toastify error for empty fields
      return;
    }

    const newCourse = {
      title: courseTitle,
      description: courseDescription,
      category: courseCategory,
      thumbnail: courseThumbnail || "",
    };

    try {
      await addCourse(newCourse);
      Swal.fire({
        title: "Success!",
        text: "Course added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while adding the course.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create a Course</h1>

      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="space-y-6">
        {/* Thumbnail Upload */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 border-2 border-dashed rounded-full flex items-center justify-center cursor-pointer">
            {courseThumbnail ? (
              <img
                src={courseThumbnail}
                alt="Course thumbnail"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleThumbnailUpload}
                  accept="image/*"
                />
                <Camera className="w-8 h-8 text-gray-400" />
              </label>
            )}
          </div>
          <p className="text-sm text-gray-500">Upload course thumbnail</p>
        </div>

        {/* Course Details */}
        <div className="space-y-4">
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Course Name"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          />

          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Course Description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />

          {/* Category Select */}
          <div className="relative">
            <div
              className="w-full px-4 py-2 border rounded-lg flex justify-between items-center cursor-pointer hover:border-gray-400"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <span className={courseCategory ? "text-black" : "text-gray-400"}>
                {courseCategory
                  ? categories.find((cat) => cat.id === courseCategory)?.title
                  : "Course Category"}
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isSelectOpen ? "transform rotate-180" : ""
                }`}
              />
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
        </div>

        <button
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          onClick={handleAddCourse}
        >
          Add Course
        </button>
      </div>
    </div>
  );
};

export default MentorCreateCoursePage;
