import React, { useState, useEffect, useRef } from "react";
import { Camera, ChevronDown } from "react-feather";
import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import useCourseManagement from "../../../hooks/useCourseManagement";
import { toast } from "react-toastify";
import api from "../../../shared/utils/api";
import { config } from "../../../shared/configs/config";
import { showToast } from "../../../shared/utils/toastUtils";
import Breadcrumbs from "../components/BreadCrumbs";
import { Category } from "../../../shared/types/Category";

interface ImageState {
  src: string;
  type?: string;
}

const MentorCreateCoursePage = () => {
  const { addCourse, loading, error, categories, fetchCategories } =
    useCourseManagement();

  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseCategory, setCourseCategory] = useState<Category | null>(null);
  const [courseThumbnail, setCourseThumbnail] = useState<string | null>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  // New state for image cropping
  const [image, setImage] = useState<ImageState | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const cropperRef = useRef<CropperRef>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Modified thumbnail upload to support cropping
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create blob URL for the image
    const blob = URL.createObjectURL(file);
    setImage({ src: blob, type: file.type });
    setIsCropping(true);

    // Clear the input to allow re-uploading the same file
    if (e.target) {
      e.target.value = "";
    }
  };

  const handleCropComplete = async () => {
    if (cropperRef.current) {
      // Get cropped image
      const canvas = cropperRef.current.getCanvas();

      if (canvas) {
        // Convert canvas to blob
        canvas.toBlob(async (blob) => {
          if (!blob) return;

          const formData = new FormData();
          formData.append("file", blob, "cropped-image.png");

          try {
            const response = await api.post(
              `${config.API_BASE_URL}/mentor/upload/course-img`,
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            );

            showToast.success("Image uploaded successfully!");
            setCourseThumbnail(response.data.url);
            setIsCropping(false);

            // Revoke the original blob URL
            if (image?.src) {
              URL.revokeObjectURL(image.src);
            }
          } catch (error: any) {
            showToast.error("Image upload failed!");
            console.error("Upload error:", error.message || error);
          }
        }, "image/png");
      }
    }
  };

  const handleAddCourse = async () => {
    if (
      !courseTitle ||
      !courseCategory ||
      !courseDescription ||
      !courseThumbnail
    ) {
      toast.error("Please fill out all fields and upload a thumbnail.");
      return;
    }

    const newCourse = {
      title: courseTitle,
      description: courseDescription,
      category: courseCategory,
      thumbnail: courseThumbnail,
    };

    try {
      await addCourse(newCourse);
      // toast.success("Course created successfully!");
    } catch (err) {
      console.error("Error creating course:", err);
      toast.error("Failed to create course. Please try again.");
    }
  };

  // Cleanup blob URL
  useEffect(() => {
    return () => {
      if (image?.src) {
        URL.revokeObjectURL(image.src);
      }
    };
  }, [image]);

  // Trigger file input
  const onUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // Render cropping modal
  if (isCropping && image) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
          <h2 className="text-xl font-bold mb-4">Crop Your Image</h2>
          <div className="aspect-video">
            <Cropper
              ref={cropperRef}
              src={image.src}
              className="cropper"
              stencilProps={{
                aspectRatio: 16 / 9,
              }}
            />
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={() => setIsCropping(false)}
              className="px-4 py-2 border border-purple-500 text-purple-500 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleCropComplete}
              className="px-4 py-2 bg-purple-600 text-white rounded"
            >
              Save Crop
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Breadcrumbs
        paths={[
          { title: "Courses", link: "/mentor/courses" },
          { title: "Create Course", link: "/mentor/courses/create" },
        ]}
      />

      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        Create a Course
      </h1>

      {loading && <p className="text-purple-500">Loading courses...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="space-y-6">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="relative flex items-center justify-center w-full aspect-video border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100"
          >
            {courseThumbnail ? (
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={courseThumbnail}
                  alt="Course thumbnail"
                  className="w-full h-full object-cover rounded-lg"
                  style={{
                    aspectRatio: "16 / 9",
                    objectPosition: "center",
                  }}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCourseThumbnail(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6">
                <svg
                  className="w-8 h-8 mb-4 text-purple-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-purple-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-purple-500">
                  Recommended: 16:9 aspect ratio (1920x1080)
                </p>
              </div>
            )}
            <input
              ref={inputRef}
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleThumbnailUpload}
              accept="image/*"
            />
          </label>
        </div>

        {/* Rest of the form remains the same */}
        <input
          className="w-full px-4 py-2 border border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Course Name"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 border border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Course Description"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
        />

        <div className="relative">
          <div
            className="w-full px-4 py-2 border border-purple-400 rounded-lg flex justify-between items-center cursor-pointer"
            onClick={() => setIsSelectOpen(!isSelectOpen)}
          >
            <span className={courseCategory ? "text-black" : "text-purple-400"}>
              {courseCategory
                ? categories.find((cat) => cat.id === courseCategory.id)?.title
                : "Select Course Category"}
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
                    setCourseCategory(category);
                    setIsSelectOpen(false);
                  }}
                >
                  {category.title}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={handleAddCourse}
        >
          Add Course
        </button>
      </div>
    </div>
  );
};

export default MentorCreateCoursePage;
