import React, { useEffect, useRef } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Camera, ChevronDown, GripVertical, Plus, X } from "lucide-react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { toast } from "react-toastify";
import useCourseManagement from "../../../../hooks/useCourseManagement";
import api from "../../../../shared/utils/api";
import { config } from "../../../../shared/configs/config";
import { showToast } from "../../../../shared/utils/toastUtils";
import Breadcrumbs from "../../components/BreadCrumbs";
import { Category } from "../../../../shared/types/Category";
import { Course } from "../../../../shared/types/Course";
import useFetch from "../../../../hooks/useFetch";
import { Lesson } from "../../../../shared/types/Lesson";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import LessonForm from "../../components/course/LessonForm";

interface ImageState {
  src: string;
  type?: string;
}

interface FormInputs {
  title: string;
  description: string;
  category: { title: string; id: string } | null;
  thumbnail: string | null;
  lessons: { id: string; title: string }[];
}

const courseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  thumbnail: z.string().url("The thumbnail must be a valid URL"),
  category: z
    .object({
      id: z.string().min(1, "Category ID is required"),
      title: z.string().min(1, "Category title is required"),
    })
    .nullable() // Allows category to be null initially
    .refine((data) => data !== null, {
      message: "Please select a valid category",
    }),

  lessons: z
    .array(
      z.object({
        id: z.string().nonempty("Lesson ID is required"),
        title: z.string().nonempty("Lesson title is required"),
      })
    )
    .refine(
      (materials) => {
        const ids = materials.map((material) => material.id);
        const uniqueIds = new Set(ids);
        console.log("Checking Lesson: ", ids, uniqueIds);

        if (uniqueIds.size !== ids.length) {
          showToast.error("Duplicate or empty lesson IDs are not allowed");
          return false;
        }
        return true;
      },
      { message: "Duplicate or empty lesson IDs are not allowed" }
    ),
  // duration: z
  //   .number({ invalid_type_error: "Duration must be a number" })
  //   .min(15, "Duration must be at least 15 minute"),
});

interface CourseFormProps {}

const CourseForm: React.FC<CourseFormProps> = ({}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [image, setImage] = React.useState<ImageState | null>(null);
  const [isCropping, setIsCropping] = React.useState(false);
  const [isSelectOpen, setIsSelectOpen] = React.useState(false);
  const cropperRef = useRef<CropperRef>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { addCourse, loading, error, categories, fetchCategories } =
    useCourseManagement();

  const {
    data: lessons,
    // loading,
    // error,
  } = useFetch<Lesson[]>("/api/lessons");
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(courseSchema),

    defaultValues: {
      title: "",
      description: "",
      category: null,
      thumbnail: null,
      lessons: lessons
        ? lessons.map((lesson) => ({ id: "", title: lesson.title }))
        : [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "lessons",
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
        canvas.toBlob(async (blob) => {
          if (!blob) return;

          const formData = new FormData();
          formData.append("file", blob, "cropped-image.png");

          try {
            const response = await api.post(
              `/api/upload/course-img`,
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            );

            showToast.success("Image uploaded successfully!");
            setValue("thumbnail", response.data.url);
            setIsCropping(false);

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

  const onSubmit = async (data: FormInputs) => {
    console.log(
      "datas",
      data.title,
      data.category,
      data.description,
      data.thumbnail,
      data.lessons
    );
    if (
      !data.title ||
      !data.category?.id || // Ensures category is not null and has an id
      !data.category?.title || // Ensures category has a valid title
      !data.description ||
      !data.thumbnail ||
      !data.lessons
    ) {
      toast.error("Please fill out all fields and upload a thumbnail.");
      return;
    }

    try {
      const result = await addCourse(data as Partial<Course>);
      if (result) {
        reset();
      }
    } catch (err) {
      console.error("Error creating course:", err);
      toast.error("Failed to create course. Please try again.");
    }
  };

  useEffect(() => {
    return () => {
      if (image?.src) {
        URL.revokeObjectURL(image.src);
      }
    };
  }, [image]);

  const onUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const updatedLessons = Array.from(watch("lessons"));
    const [movedItem] = updatedLessons.splice(result.source.index, 1);
    updatedLessons.splice(result.destination.index, 0, movedItem);
    setValue("lessons", updatedLessons);
  };
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

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

  const thumbnail = watch("thumbnail");

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        Create a Course
      </h1>
      {loading && <p className="text-purple-500">Loading courses...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Thumbnail Upload */}
        <div className="space-y-2">
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium text-purple-700"
          >
            Thumbnail
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="relative flex items-center justify-center w-full aspect-video border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100"
            >
              {thumbnail ? (
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={thumbnail}
                    alt="Course thumbnail"
                    className="w-full h-full object-cover rounded-lg"
                    style={{ aspectRatio: "16 / 9", objectPosition: "center" }}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setImage(null);
                      setValue("thumbnail", null);
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-purple-500">
                    Recommended: 16:9 aspect ratio (1920x1080)
                  </p>
                </div>
              )}
              <input
                {...register("thumbnail")}
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleThumbnailUpload}
                accept="image/*"
              />
            </label>
          </div>
          {errors.thumbnail && (
            <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
          )}
        </div>

        {/* Course Title */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-purple-700"
          >
            Course Title
          </label>
          <input
            {...register("title")}
            id="title"
            className="w-full px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Course Name"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Course Description */}
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-purple-700"
          >
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            className="w-full px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Course Description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Category Selector */}
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-purple-700"
          >
            Category
          </label>
          <div className="relative">
            <div
              className="w-full px-4 py-2 border border-purple-200 rounded-md flex justify-between items-center cursor-pointer"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <span
                className={
                  watch("category")?.id ? "text-black" : "text-purple-400"
                }
              >
                {watch("category")?.id
                  ? categories.find((cat) => cat.id === watch("category")?.id)
                      ?.title
                  : "Select Course Category"}
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isSelectOpen ? "rotate-180" : ""
                } text-purple-500`}
              />
            </div>
            {isSelectOpen && (
              <div className="absolute w-full mt-1 bg-white border border-purple-200 rounded-md shadow-lg z-10">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="px-4 py-2 hover:bg-purple-100 cursor-pointer text-purple-700"
                    onClick={() => {
                      setValue("category", category);
                      setIsSelectOpen(false);
                    }}
                  >
                    {category.title}
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Draggable Lessons */}
        {/* <LessonForm /> */}

        {/* Submit Button */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Setup Lessons</h2>
          <LessonForm />
        </div>
        <div className="space-y-2">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
