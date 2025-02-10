import React, { useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema } from "../../schemas/courseSchema";
import UploadThumbnail from "./UploadThumbnail";
import LessonList from "./LessonDragList";
import useCourseManagement from "../../../../hooks/useCourseManagement";
import useFetch from "../../../../hooks/useFetch";
import { Lesson } from "../../../../shared/types/Lesson";
import { showToast } from "../../../../shared/utils/toastUtils";
import { Course } from "../../../../shared/types/Course";
import { useNavigate } from "react-router-dom";

export interface FormInputs {
  title: string;
  description: string;
  category: { title: string; id: string } | null;
  thumbnail: string | null;
  lessons: { id: string; title: string }[];
}

interface CourseFormProps {}

const CourseForm: React.FC<CourseFormProps> = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSelectOpen, setIsSelectOpen] = React.useState(false);

  const navigate = useNavigate();

  const { addCourse, loading, error, categories, fetchCategories } =
    useCourseManagement();

  const {
    data: lessons,
    // loading,
    // error,
  } = useFetch<Lesson[]>("/mentor/lessons");
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
      showToast.error("Please fill out all fields and upload a thumbnail.");
      return;
    }

    try {
      const result = await addCourse(data as Partial<Course>);
      if (result) {
        methods.reset();
        navigate("/mentor/my-courses");
      }
    } catch (err) {
      console.error("Error creating course:", err);
      showToast.error("Failed to create course. Please try again.");
    }
  };
  const defaultValues: FormInputs = {
    title: "",
    description: "",
    category: null,
    thumbnail: null,
    lessons: [],
  };

  const methods = useForm<FormInputs>({
    resolver: zodResolver(courseSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <input {...methods.register("title")} placeholder="Title" />
        <textarea
          {...methods.register("description")}
          placeholder="Description"
        />
        <UploadThumbnail setValue={methods.setValue} />
        <LessonList />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default CourseForm;
