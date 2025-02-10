import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { GripVertical, Plus, X } from "lucide-react";
import api from "../../../../shared/utils/api";
import { showToast } from "../../../../shared/utils/toastUtils";
import MaterialForm from "./MaterialFrom";

const lessonSchema = z.object({
  lessons: z.array(
    z.object({
      id: z.string().optional(),
      title: z.string().min(3, "Title must be at least 3 characters"),
      description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
      duration: z.number().min(1, "Duration must be at least 1 minute"),
      materials: z.array(z.string()).min(1, "Select at least one material"),
    })
  ),
});

interface LessonFormData extends z.infer<typeof lessonSchema> {}

const LessonForm: React.FC = () => {
  const [availableMaterials, setAvailableMaterials] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: { lessons: [] },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "lessons",
  });

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await api.get("/mentor/materials");
      if (response.data) setAvailableMaterials(response.data.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  const onSubmit = async (data: LessonFormData) => {
    try {
      setIsSubmitting(true);
      const response = await api.post("/mentor/lessons", data);
      showToast.success(response.data.message);
    } catch (error) {
      console.error("Error creating lesson:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-purple-900">
          Create New Lessons
        </h1>
        <p className="text-gray-600 mt-1">
          Add multiple lessons to your course
        </p>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="lessons">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4 mt-4"
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
                        className="flex flex-col bg-purple-50 p-4 rounded-md group border border-purple-200"
                      >
                        <div className="flex items-center justify-between">
                          <div
                            {...provided.dragHandleProps}
                            className="text-purple-400 cursor-grab"
                          >
                            <GripVertical className="h-5 w-5" />
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-purple-400 hover:text-purple-600"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="space-y-3 mt-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Lesson Title
                            </label>
                            <input
                              {...register(`lessons.${index}.title`)}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500"
                              placeholder="Enter lesson title"
                            />
                            {errors.lessons?.[index]?.title && (
                              <p className="text-red-600 text-sm">
                                {errors.lessons[index].title?.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              {...register(`lessons.${index}.description`)}
                              rows={3}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500"
                              placeholder="Enter lesson description"
                            />
                            {errors.lessons?.[index]?.description && (
                              <p className="text-red-600 text-sm">
                                {errors.lessons[index].description?.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Duration (minutes)
                            </label>
                            <input
                              type="number"
                              {...register(`lessons.${index}.duration`, {
                                valueAsNumber: true,
                              })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500"
                              placeholder="Enter lesson duration"
                            />
                            {errors.lessons?.[index]?.duration && (
                              <p className="text-red-600 text-sm">
                                {errors.lessons[index].duration?.message}
                              </p>
                            )}
                          </div>

                          <MaterialForm />
                        </div>
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
          onClick={() =>
            append({
              id: "",
              title: "",
              description: "",
              duration: 0,
              materials: [],
            })
          }
          className="w-full mt-4 py-2 px-4 border border-purple-200 rounded-md text-purple-700 hover:bg-purple-50 flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Lesson
        </button>
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full mt-4 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          {isSubmitting ? "Creating..." : "Submit Lessons"}
        </button>
      </div>
      {/* <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Setup Lessons</h2>
        <MaterialForm />
      </div> */}
    </div>
  );
};

export default LessonForm;
