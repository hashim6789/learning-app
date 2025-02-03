import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Clock,
  Book,
  ArrowLeft,
  Edit,
  Save,
  X,
  Plus,
  Loader2,
  GripVertical,
} from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import useFetch from "../../../../hooks/useFetch";
import { Lesson } from "../../../../shared/types/Lesson";
import api from "../../../../shared/utils/api";
import { config } from "../../../../shared/configs/config";
import { showToast } from "../../../../shared/utils/toastUtils";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Course {
  id: string;
  title: string;
  description: string;
  lessons: { id: string; title: string }[];
  duration: number;
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
  duration: z
    .number({ invalid_type_error: "Duration must be a number" })
    .min(15, "Duration must be at least 15 minute"),
});

const MentorCourseDetailsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { courseId } = useParams();

  // Fetch course data
  const {
    data: course,
    loading: courseLoading,
    error: courseError,
  } = useFetch<Course>(`/mentor/courses/${courseId}`);

  // Fetch lessons for dropdown
  const {
    data: lessons,
    loading: lessonsLoading,
    error: lessonsError,
  } = useFetch<Lesson[]>("/mentor/lessons");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Course>({
    resolver: zodResolver(courseSchema),
    defaultValues: course || {
      title: "",
      description: "",
      lessons: lessons
        ? lessons.map((lesson) => ({ id: "", title: lesson.title }))
        : [],
      duration: 30,
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "lessons",
  });

  React.useEffect(() => {
    if (course) {
      reset(course);
    }
  }, [course, reset]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  const onSubmit = async (data: Course) => {
    setIsSubmitting(true);
    try {
      const titleRemovedLessons = data.lessons.map((material) => material.id);
      const putData = { ...data, lessons: titleRemovedLessons };
      const response = await api.put(
        `${config.API_BASE_URL}/mentor/courses/${courseId}`,
        putData
      );
      if (response && response.status === 200 && response.data) {
        showToast.success("Course updated successfully");
        setIsEditing(false);
      } else {
        showToast.error(response.data.message);
      }
    } catch (error: any) {
      showToast.error(error.message);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (courseError || !course) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center text-red-600">
        Error loading course
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button and Edit Toggle */}
        <div className="flex justify-between items-center mb-6">
          <button
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Course
              </>
            )}
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {isEditing ? (
            // Edit Mode
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-purple-700">
                  Course Title
                </label>
                <input
                  {...register("title")}
                  className="w-full px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-purple-700">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="w-full px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px]"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-purple-700">
                  Lessons
                </label>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="lessons">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {fields.map((field, index) => (
                          <Draggable
                            key={field.id}
                            draggableId={field.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center gap-2 bg-purple-50 p-2 rounded-md"
                              >
                                <div
                                  {...provided.dragHandleProps}
                                  className="text-purple-400"
                                >
                                  <GripVertical className="h-5 w-5" />
                                </div>
                                <select
                                  {...register(`lessons.${index}.title`, {
                                    onChange: (e) => {
                                      const selectedLesson = lessons?.find(
                                        (m) => m.title === e.target.value
                                      );
                                      if (selectedLesson) {
                                        setValue(
                                          `lessons.${index}.id`,
                                          selectedLesson.id
                                        );
                                      }
                                    },
                                  })}
                                  className="flex-1 px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                  <option value="">Select Lesson</option>
                                  {lessonsLoading ? (
                                    <option>Loading...</option>
                                  ) : lessonsError ? (
                                    <option>Error loading lessons</option>
                                  ) : lessons ? (
                                    lessons.map((material) => (
                                      <option
                                        key={material.id}
                                        value={material.title}
                                      >
                                        {material.title}
                                      </option>
                                    ))
                                  ) : null}
                                </select>
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="p-2 text-purple-400 hover:text-purple-600 hover:bg-purple-100 rounded-md transition-colors"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                <button
                  type="button"
                  onClick={() => append({ id: "", title: "" })}
                  className="w-full py-2 px-4 border border-purple-200 rounded-md text-purple-700 hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Lesson
                </button>
                {fields.map(
                  (_, index) =>
                    errors.lessons?.[index]?.title && (
                      <p key={index} className="text-red-500 text-sm">
                        {errors.lessons[index].title.message}
                      </p>
                    )
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-purple-700">
                  Duration (minutes)
                </label>
                <input
                  id="duration"
                  type="number"
                  defaultValue={course.duration}
                  {...(register("duration"), { valueAsNumber: true })}
                  onChange={(e) =>
                    setValue("duration", Number(e.target.value) || 0)
                  }
                  className="w-full px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm">
                    {errors.duration.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </form>
          ) : (
            // View Mode
            <>
              <div className="bg-purple-600 text-white p-8">
                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{course.duration} minutes</span>
                  </div>
                  <div className="flex items-center">
                    <Book className="h-5 w-5 mr-2" />
                    <span>{course.lessons.length} lessons</span>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-purple-800 mb-4">
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-purple-800 mb-4">
                    Learning Lessons
                  </h2>
                  <div className="grid gap-3">
                    {course.lessons.map((material, index) => (
                      <div
                        key={material.id}
                        className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        <span className="h-8 w-8 flex items-center justify-center bg-purple-200 text-purple-700 rounded-full mr-4">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-medium text-purple-900">
                            {material.title}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorCourseDetailsPage;
