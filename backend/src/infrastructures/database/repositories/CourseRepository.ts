import ICourseRepository from "../../../application/IRepositories/ICourseRepository";
import { CreateCourseDTO } from "../../../shared/dtos/createCourseDTO";
import Course from "../../../application/entities/Course";
import CourseModel, { ICourses } from "../models/CourseModel";
import { ICategory } from "../models/CategoryModel";
import Lesson from "../../../application/entities/Lesson";
import { ILessons } from "../models/LessonModel";
import { Category } from "../../../application/entities/Category";

class CourseRepository implements ICourseRepository {
  //find a course by id
  async findCourseById(courseId: string): Promise<Course | null> {
    try {
      const course = await CourseModel.findById(courseId)
        .populate("categoryId", "_id title isListed")
        .orFail();
      console.log(course);
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

      console.log(course);
      return course ? courseMapping(course) : null;
    } catch (error) {
      throw new Error("Failed to fetch the courses");
    }
  }

  //fetch all courses
  async fetchAllCourses(): Promise<Course[] | null> {
    try {
      const courses = await CourseModel.find()
        .populate("categoryId", "_id title isListed")
        .orFail();
      return courses ? courses.map((course) => courseMapping(course)) : null;
    } catch (error) {
      if (error instanceof Error && error.name === "DocumentNotFoundError") {
        return [];
      }
      throw new Error("Failed to fetch the courses!");
    }
  }

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
    console.log(data);
    try {
      const newCourse = new CourseModel({
        title: data.title,
        mentorId: data.mentorId,
        categoryId: data.category.id,
        description: data.description || null,
        thumbnail: data.thumbnail,
      });

      const createdCourse = await newCourse.save();
      console.log("Saved Course:", createdCourse);

      return createdCourse ? courseMapping(createdCourse) : null;
    } catch (error) {
      throw new Error("Failed to fetch the course");
    }
  }

  async fetchAllCoursesByMentorId(mentorId: string): Promise<Course[] | null> {
    try {
      const courses = await CourseModel.find({ mentorId })
        .populate("categoryId", "_id title isListed")
        .orFail();
      console.log(courses);
      if (!courses) return null;
      return courses.map((course) => courseMapping(course));
    } catch (error) {
      if (error instanceof Error && error.name === "DocumentNotFoundError") {
        return [];
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
}

// interface MappedLesson {
//   id: string;
//   title?: string;
//   description?: string;
// }

export function courseMapping(course: ICourses): Course {
  const category: Category =
    course.categoryId && typeof course.categoryId === "object"
      ? {
          id: (course.categoryId as ICategory)._id.toString(),
          title: (course.categoryId as ICategory).title,
          isListed: (course.categoryId as ICategory).isListed,
        }
      : { id: "", title: "Unknown", isListed: false };

  return {
    id: course._id.toString(),
    title: course.title,
    mentorId: course.mentorId.toString(),
    category: category,
    description: course.description || null,
    thumbnail: course.thumbnail,
    lessons: [],
    duration: course.duration || null,
    status: course.status || null,
    rejectionReason: course.rejectionReason || null,
    purchaseCount: course.purchaseCount || 0,
  };
}

export default CourseRepository;
