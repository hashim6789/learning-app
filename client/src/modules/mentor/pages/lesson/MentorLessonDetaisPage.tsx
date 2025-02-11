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
import { IMaterial } from "../../../../shared/types/Material";
import api from "../../../../shared/utils/api";
import { config } from "../../../../shared/configs/config";
import { showToast } from "../../../../shared/utils/toastUtils";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";

interface Lesson {
  id: string;
  title: string;
  description: string;
  materials: { id: string; title: string }[];
  duration: number;
}

const lessonSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  materials: z
    .array(
      z.object({
        id: z.string().nonempty("Material ID is required"),
        title: z.string().nonempty("Material title is required"),
      })
    )
    .refine(
      (materials) => {
        const ids = materials.map((material) => material.id);
        const uniqueIds = new Set(ids);
        console.log("Checking materials: ", ids, uniqueIds);

        // Check for duplicate IDs or empty IDs
        if (uniqueIds.size !== ids.length) {
          showToast.error("Duplicate or empty material IDs are not allowed");
          return false; // Trigger validation failure
        }
        return true; // No duplicates and no empty IDs
      },
      { message: "Duplicate or empty material IDs are not allowed" }
    ),
  duration: z
    .number({ invalid_type_error: "Duration must be a number" })
    .min(15, "Duration must be at least 15 minute"),
});

const MentorLessonDetailsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { lessonId } = useParams();

  const navigate = useNavigate();

  // Fetch lesson data
  const {
    data: lesson,
    loading: lessonLoading,
    error: lessonError,
  } = useFetch<Lesson>(`/mentor/lessons/${lessonId}`);

  // Fetch materials for dropdown
  const {
    data: materials,
    loading: materialsLoading,
    error: materialsError,
  } = useFetch<IMaterial[]>("/mentor/materials");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Lesson>({
    resolver: zodResolver(lessonSchema),
    defaultValues: lesson || {
      title: "",
      description: "",
      materials: [],
      duration: 20,
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "materials",
  });

  React.useEffect(() => {
    if (lesson) {
      reset(lesson);
    }
  }, [lesson, reset]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  const onSubmit = async (data: Lesson) => {
    setIsSubmitting(true);
    try {
      const titleRemovedMaterials = data.materials.map(
        (material) => material.id
      );
      const putData = { ...data, materials: titleRemovedMaterials };
      const response = await api.put(
        `${config.API_BASE_URL}/mentor/lessons/${lessonId}`,
        putData
      );
      if (response && response.status === 200 && response.data) {
        showToast.success("Lesson updated successfully");
        setIsEditing(false);
        navigate("/mentor/my-lessons");
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

  if (lessonLoading) {
    return <LoadingComponent item="lesson" theme="purple" />;
  }

  // Error handling
  if (lessonError || !lesson) {
    return <ErrorComponent item="lesson" theme="purple" />;
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
            Back to Lessons
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
                Edit Lesson
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
                  Lesson Title
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
                  Materials
                </label>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="materials">
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
                                  {...register(`materials.${index}.title`, {
                                    required: "Material selection is required",
                                    onChange: (e) => {
                                      const selectedMaterial = materials?.find(
                                        (m) => m.title === e.target.value
                                      );
                                      if (selectedMaterial) {
                                        setValue(
                                          `materials.${index}.id`,
                                          selectedMaterial.id
                                        );
                                      }
                                    },
                                  })}
                                  className="flex-1 px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                  <option value="">Select Material</option>
                                  {materialsLoading ? (
                                    <option>Loading...</option>
                                  ) : materialsError ? (
                                    <option>Error loading materials</option>
                                  ) : materials ? (
                                    materials.map((material) => (
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
                  Add Material
                </button>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-purple-700"
                >
                  Duration (minutes)
                </label>
                <input
                  id="duration"
                  type="number"
                  defaultValue={lesson.duration}
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
                <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{lesson.duration} minutes</span>
                  </div>
                  <div className="flex items-center">
                    <Book className="h-5 w-5 mr-2" />
                    <span>{lesson.materials.length} materials</span>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-purple-800 mb-4">
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {lesson.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-purple-800 mb-4">
                    Learning Materials
                  </h2>
                  <div className="grid gap-3">
                    {lesson.materials.map((material, index) => (
                      <div
                        onClick={() =>
                          navigate(`/mentor/my-materials/${material.id}`)
                        }
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

export default MentorLessonDetailsPage;
