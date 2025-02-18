import ICourseRepository from "../../../application/IRepositories/ICourseRepository";
import { CreateCourseDTO } from "../../../shared/dtos/createCourseDTO";
import Course from "../../../application/entities/Course";
import CourseModel, { ICourses } from "../models/CourseModel";
import { ICategory } from "../models/CategoryModel";
// import Lesson from "../../../application/entities/Lesson";
import { ILessons } from "../models/LessonModel";
import { Category } from "../../../application/entities/Category";
import mongoose from "mongoose";
import { CourseLearnerQuery, CourseQuery } from "../../../shared/types/filters";
import { CourseStatus } from "../../../shared/types";

class CourseRepository implements ICourseRepository {
  //find a course by id
  async findCourseById(courseId: string): Promise<Course | null> {
    try {
      const course = await CourseModel.findById(courseId)
        .populate("categoryId", "_id title isListed")
        .populate("lessons", "_id title")
        .orFail();
      return course ? courseMapping(course) : null;
    } catch (error) {
      throw new Error("Failed to fetch the courses");
    }
  }

  async findCourseByTitle(title: string): Promise<Course | null> {
    try {
      const course = await CourseModel.findOne({
        title: { $regex: new RegExp(`^${title}$`, "i") },
      });

      return course ? courseMapping(course) : null;
    } catch (error) {
      throw new Error("Failed to fetch the courses");
    }
  }

  async fetchAllCourses({
    status = "all",
    search = "",
    page = "1",
    limit = "10",
  }: CourseQuery): Promise<{ courses: Course[]; docCount: number } | null> {
    try {
      const query = {
        status:
          status !== "all"
            ? status
            : { $in: ["requested", "approved", "published"] },
        title: { $regex: search, $options: "i" },
      };
      const courses = await CourseModel.find(query)
        .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
        .limit(parseInt(limit, 10))
        .sort({
          createdAt: -1,
        })
        .populate("categoryId", "_id title isListed")
        .orFail();

      if (!courses) return null;
      const totalCount = await CourseModel.countDocuments(query);
      const mappedLessons = courses.map((course) => courseMapping(course));

      return { courses: mappedLessons, docCount: totalCount };
    } catch (error) {
      if (error instanceof Error && error.name === "DocumentNotFoundError") {
        return null;
      }
      throw new Error("Failed to fetch the courses!");
    }
  }

  //fetch all courses
  // async fetchAllCourses(): Promise<{
  //   courses: Course[];
  //   docCount: number;
  // } | null> {
  //   try {
  //     const query = {
  //       status: { $in: ["requested", "approved", "published"] },
  //     };
  //     const courses = await CourseModel.find(query)
  //       .populate("categoryId", "_id title isListed")
  //       .orFail()
  //       .sort({
  //         createdAt: -1,
  //       });

  //     const totalCount = await CourseModel.countDocuments(query);

  //     if (!courses) return null;
  //     const mappedLessons = courses.map((course) => courseMapping(course));

  //     return { courses: mappedLessons, docCount: totalCount };
  //   } catch (error) {
  //     if (error instanceof Error && error.name === "DocumentNotFoundError") {
  //       return null;
  //     }
  //     throw new Error("Failed to fetch the courses!");
  //   }
  // }

  //update the existing course by id
  async updateCourseById(
    courseId: string,
    data: Partial<Course>
  ): Promise<Course | null> {
    try {
      const updatedCourse = await CourseModel.findByIdAndUpdate(
        courseId,
        data,
        { new: true }
      )
        .populate("categoryId", "_id title isListed")
        .orFail();
      return updatedCourse ? courseMapping(updatedCourse) : null;
    } catch (error) {
      throw new Error("Failed to fetch the course");
    }
  }

  //delete the existing course by id
  async deleteCourseById(courseId: string): Promise<Course | null> {
    try {
      const deletedCourse = await CourseModel.findByIdAndDelete(courseId)
        .populate("categoryId", "_id title isListed")
        .orFail();
      return deletedCourse ? courseMapping(deletedCourse) : null;
    } catch (error) {
      throw new Error("Failed to fetch the course");
    }
  }

  //create the new course with minimal credentials
  async createCourse(data: CreateCourseDTO): Promise<Course | null> {
    try {
      const lessons = data.lessons.map((id) => new mongoose.Types.ObjectId(id));
      const newCourse = new CourseModel({
        title: data.title,
        description: data.description || null,
        mentorId: data.mentorId,
        categoryId: data.category,
        lessons,
        thumbnail: data.thumbnail,
        price: data.price,
      });

      const createdCourse = await newCourse.save();

      return createdCourse ? courseMapping(createdCourse) : null;
    } catch (error) {
      throw new Error("Failed to fetch the course");
    }
  }

  async fetchAllCoursesByMentorId(
    mentorId: string,
    { status = "all", search = "", page = "1", limit = "10" }: CourseQuery
  ): Promise<{ courses: Course[]; docCount: number } | null> {
    try {
      const query = {
        mentorId,
        status: status !== "all" ? status : { $exists: true },
        title: { $regex: search, $options: "i" },
      };
      const courses = await CourseModel.find(query)
        .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
        .limit(parseInt(limit, 10))
        .populate("categoryId", "_id title isListed")
        // .orFail()
        .sort({ createdAt: -1 });

      if (!courses) return null;
      const totalCount = await CourseModel.countDocuments(query);

      const mappedCourses = courses.map((course) => courseMapping(course));

      return { courses: mappedCourses, docCount: totalCount };
    } catch (error) {
      if (error instanceof Error && error.name === "DocumentNotFoundError") {
        return null;
      }
      throw new Error("Failed to fetch the course");
    }
  }

  async addLessonsToCourse(
    courseId: string,
    lessonId: string
  ): Promise<Course | null> {
    try {
      const updatedCourse = await CourseModel.findByIdAndUpdate(
        courseId,
        { $addToSet: { lessons: lessonId } }, // Add lessonId to lessons array
        { new: true } // Return the updated course document
      ).populate({
        path: "lessons", // Populate the lessons field
        select: "title description _id", // Include only these fields
      });

      return updatedCourse ? courseMapping(updatedCourse) : null;
    } catch (error) {
      throw new Error("Failed to add lesson to the course");
    }
  }
  async fetchAllCoursesByFilter(
    status: CourseStatus,
    {
      category = "all",
      search = "",
      page = "1",
      limit = "10",
    }: CourseLearnerQuery
  ): Promise<{ courses: Course[]; docCount: number } | null> {
    try {
      const query = {
        status,
        categoryId: category !== "all" ? category : { $exists: true },
        title: { $regex: search, $options: "i" },
      };
      const filteredCourse = await CourseModel.find(query)
        .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
        .limit(parseInt(limit, 10))
        .populate({
          path: "categoryId",
          select: "title _id",
        });

      const totalCount = await CourseModel.countDocuments(query);

      if (!filteredCourse) return null;
      const mappedCourses = filteredCourse.map((course) =>
        courseMapping(course)
      );

      return { courses: mappedCourses, docCount: totalCount };
    } catch (error) {
      throw new Error("Failed to add lesson to the course");
    }
  }
}

// interface MappedLesson {
//   id: string;
//   title?: string;
//   description?: string;
// }

interface Lesson {
  id: string;
  title: string;
}

export function courseMapping(course: ICourses): Course {
  const category: Category =
    course.categoryId && typeof course.categoryId === "object"
      ? {
          id: (course.categoryId as ICategory)._id.toString(),
          title: (course.categoryId as ICategory).title,
          isListed: (course.categoryId as ICategory).isListed,
        }
      : { id: "", title: "Unknown", isListed: false };

  const lessons = course.lessons
    ? course.lessons.map<Lesson>((lesson: any) => {
        return { id: lesson._id.toString(), title: lesson.title };
      })
    : [];

  return {
    id: course._id.toString(),
    title: course.title,
    mentorId: course.mentorId.toString(),
    category: category,
    description: course.description || null,
    thumbnail: course.thumbnail,
    lessons,
    price: course.price,
    duration: course.duration || null,
    status: course.status || null,
    rejectionReason: course.rejectionReason || null,
    purchaseCount: course.purchaseCount || 0,
  };
}

export default CourseRepository;
