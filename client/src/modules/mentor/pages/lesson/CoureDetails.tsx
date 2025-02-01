import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Edit,
  Save,
  X,
  ChevronDown,
  ExternalLink,
  Book,
  Clock,
  Award,
} from "lucide-react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { Course } from "../../../../shared/types/Course";
import { Category } from "../../../../shared/types/Category";
import useCourseManagement from "../../../../hooks/useCourseManagement";
interface CourseDetailsProps {
  course: Course;
  categories: Category[];
}

const CourseDetails: React.FC<CourseDetailsProps> = ({
  course,
  categories,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [image, setImage] = useState<{ src: string; type?: string } | null>(
    null
  );

  const cropperRef = React.useRef<CropperRef>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { control, handleSubmit, watch, setValue, reset } = useForm<Course>({
    defaultValues: course,
  });

  const { editCourse: onUpdate } = useCourseManagement();

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const blob = URL.createObjectURL(file);
    setImage({ src: blob, type: file.type });
    setIsCropping(true);

    if (e.target) {
      e.target.value = "";
    }
  };

  const handleCropComplete = async () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCanvas();
      if (canvas) {
        const thumbnail = canvas.toDataURL();
        setValue("thumbnail", thumbnail);
        setIsCropping(false);
        if (image?.src) {
          URL.revokeObjectURL(image.src);
        }
      }
    }
  };

  const onSubmit = async (data: Course) => {
    try {
      await onUpdate(course.id, data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };

  const handleCancel = () => {
    reset(course);
    setIsEditing(false);
  };

  if (isCropping && image) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
        <div className="bg-white rounded-lg max-w-4xl w-full p-6">
          <h2 className="text-xl font-bold mb-4">Crop Thumbnail</h2>
          <div className="aspect-video mb-4">
            <Cropper
              ref={cropperRef}
              src={image.src}
              className="cropper"
              stencilProps={{ aspectRatio: 16 / 9 }}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsCropping(false)}
              className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCropComplete}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  const watchedThumbnail = watch("thumbnail");
  const watchedStatus = watch("status");

  return (
    <div className="max-w-5xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1
              className={`text-3xl font-bold ${
                isEditing ? "text-purple-600" : "text-gray-900"
              }`}
            >
              {isEditing ? "Edit Course" : course.title}
            </h1>
            <div className="mt-2 flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  watchedStatus === "approved"
                    ? "bg-green-100 text-green-700"
                    : watchedStatus === "draft"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {watchedStatus}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{course.category.title}</span>
            </div>
          </div>
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50"
            >
              <Edit size={20} />
              Edit Course
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <X size={20} />
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Save size={20} />
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-lg overflow-hidden border border-purple-200">
              {isEditing ? (
                <label className="block h-full">
                  <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    onChange={handleThumbnailUpload}
                    accept="image/*"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-purple-50 hover:bg-purple-100 cursor-pointer">
                    <img
                      src={watchedThumbnail}
                      alt="Course thumbnail"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
                      <ExternalLink size={24} className="mb-2" />
                      <span>Change Thumbnail</span>
                    </div>
                  </div>
                </label>
              ) : (
                <img
                  src={watchedThumbnail}
                  alt="Course thumbnail"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Description */}
            {isEditing ? (
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={6}
                    className="w-full p-4 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                )}
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {course.description}
              </p>
            )}

            {/* Lessons */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Lessons</h2>
              <div className="space-y-2">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-4 p-4 bg-white border border-purple-200 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                    <span className="flex-grow font-medium text-gray-900">
                      {lesson.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Course Stats */}
            <div className="bg-white p-6 border border-purple-200 rounded-lg space-y-4">
              <h3 className="font-semibold text-gray-900">Course Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Book size={20} />
                  <span>{course.lessons.length} Lessons</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock size={20} />
                  <span>2 Hours Total</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Award size={20} />
                  <span>Certificate on Completion</span>
                </div>
              </div>
            </div>

            {/* Category & Status (Edit Mode) */}
            {isEditing && (
              <div className="space-y-4">
                <div className="relative">
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <>
                        <div
                          onClick={() => setIsSelectOpen(!isSelectOpen)}
                          className="w-full p-3 border border-purple-300 rounded-lg flex justify-between items-center cursor-pointer"
                        >
                          <span>{field.value.title}</span>
                          <ChevronDown
                            className={`transition-transform ${
                              isSelectOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                        {isSelectOpen && (
                          <div className="absolute w-full mt-1 bg-white border border-purple-200 rounded-lg shadow-lg z-10">
                            {categories.map((category) => (
                              <div
                                key={category.id}
                                className="p-3 hover:bg-purple-50 cursor-pointer"
                                onClick={() => {
                                  field.onChange(category);
                                  setIsSelectOpen(false);
                                }}
                              >
                                {category.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  />
                </div>

                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full p-3 border border-purple-300 rounded-lg"
                    >
                      {["approved", "rejected", "draft", "pending"].map(
                        (status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        )
                      )}
                    </select>
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CourseDetails;
