import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { GripVertical, X, Plus, Loader2 } from "lucide-react";
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

type FormValues = {
  title: string;
  description: string;
  materials: { id: string; title: string }[];
  duration: number;
};

const CreateLesson = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Fetch materials from the API
  const {
    data: materials,
    loading,
    error,
  } = useFetch<IMaterial[]>("/mentor/materials");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      materials: materials
        ? materials.map((material) => ({ id: "", title: material.title }))
        : [],
      duration: 30,
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "materials",
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Lesson Created:", data);
      const titleRemovedMaterials = data.materials.map(
        (material) => material.id
      );
      const postData = { ...data, materials: titleRemovedMaterials };
      const response = await api.post(
        `${config.API_BASE_URL}/mentor/lessons`,
        postData
      );
      if (response && response.status === 201 && response.data) {
        showToast.success(response.data.message);
        reset();
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

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b border-purple-100">
        <h2 className="text-2xl font-bold text-purple-700">
          Create New Lesson
        </h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-purple-700"
            >
              Lesson Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
              className="w-full px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter lesson title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-purple-700"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
              className="w-full px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px]"
              placeholder="Enter lesson description"
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
                {(provided) => {
                  return (
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
                              className="flex items-center gap-2 bg-purple-50 p-2 rounded-md group"
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
                                    const selectedMaterial = materials
                                      ? materials.find(
                                          (material) =>
                                            material.title === e.target.value
                                        )
                                      : { id: "", title: "" };
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
                                {loading ? (
                                  <option>Loading...</option>
                                ) : error ? (
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
                                ) : (
                                  <option>No materials left</option>
                                )}
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
                  );
                }}
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
            {errors.materials && (
              <p className="text-red-500 text-sm">{errors.materials.message}</p>
            )}
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
              {...register("duration", {
                required: "Duration is required",
                min: {
                  value: 1,
                  message: "Duration must be at least 1 minute",
                },
                valueAsNumber: true,
              })}
              className="w-full px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration.message}</p>
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
                Creating Lesson...
              </>
            ) : (
              "Create Lesson"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLesson;
