import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical, Plus, X } from "lucide-react";
import api from "../../../../shared/utils/api";
import { showToast } from "../../../../shared/utils/toastUtils";

const materialSchema = z.object({
  materials: z.array(
    z.object({
      id: z.string().optional(),
      title: z.string().min(3, "Title must be at least 3 characters"),
      description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
      duration: z.number().min(1, "Duration must be at least 1 minute"),
    })
  ),
});

interface MaterialFormData extends z.infer<typeof materialSchema> {}

const MaterialForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MaterialFormData>({
    resolver: zodResolver(materialSchema),
    defaultValues: { materials: [] },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "materials",
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  const onSubmit = async (data: MaterialFormData) => {
    try {
      setIsSubmitting(true);
      const response = await api.post("/mentor/materials", data);
      showToast.success(response.data.message);
    } catch (error) {
      console.error("Error creating materials:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-purple-900">
          Create New Materials
        </h1>
        <p className="text-gray-600 mt-1">
          Add multiple materials for your lessons
        </p>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="materials">
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
                              Title
                            </label>
                            <input
                              {...register(`materials.${index}.title`)}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500"
                              placeholder="Enter material title"
                            />
                            {errors.materials?.[index]?.title && (
                              <p className="text-red-600 text-sm">
                                {errors.materials[index].title?.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              {...register(`materials.${index}.description`)}
                              rows={3}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500"
                              placeholder="Enter material description"
                            />
                            {errors.materials?.[index]?.description && (
                              <p className="text-red-600 text-sm">
                                {errors.materials[index].description?.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Duration (minutes)
                            </label>
                            <input
                              type="number"
                              {...register(`materials.${index}.duration`, {
                                valueAsNumber: true,
                              })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500"
                              placeholder="Enter material duration"
                            />
                            {errors.materials?.[index]?.duration && (
                              <p className="text-red-600 text-sm">
                                {errors.materials[index].duration?.message}
                              </p>
                            )}
                          </div>
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
            append({ id: "", title: "", description: "", duration: 0 })
          }
          className="w-full mt-4 py-2 px-4 border border-purple-200 rounded-md text-purple-700 hover:bg-purple-50 flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Material
        </button>

        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full mt-4 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          {isSubmitting ? "Creating..." : "Submit Materials"}
        </button>
      </div>
    </div>
  );
};

export default MaterialForm;
