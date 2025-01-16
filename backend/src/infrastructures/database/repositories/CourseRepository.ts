import ICourseRepository from "../../../application/IRepositories/ICourseRepository";
import { CreateCourseDTO } from "../../../shared/dtos/createCourseDTO";
import Course from "../../../application/entities/Course";
import CourseModel, { ICourses } from "../models/CourseModel";
import { ICategory } from "../models/CategoryModel";
import Lesson from "../../../application/entities/Lesson";
import { ILessons } from "../models/LessonModel";

class CourseRepository implements ICourseRepository {
  //find a course by id
  async findCourseById(courseId: string): Promise<Course | null> {
    try {
      const course = await CourseModel.findById(courseId);
      return course ? courseMapping(course) : null;
    } catch (error) {
      throw new Error("Failed to fetch the courses");
    }
  }

  //fetch all courses
  async fetchAllCourses(): Promise<Course[] | null> {
    try {
      const courses = await CourseModel.find()
        .populate("categoryId", "title _id")
        .exec();
      return courses ? courses.map((course) => courseMapping(course)) : null;
    } catch (error) {
      throw new Error("Failed to fetch the course");
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
      );
      return updatedCourse ? courseMapping(updatedCourse) : null;
    } catch (error) {
      throw new Error("Failed to fetch the course");
    }
  }

  //delete the existing course by id
  async deleteCourseById(courseId: string): Promise<Course | null> {
    try {
      const deletedCourse = await CourseModel.findByIdAndDelete(courseId);
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
        categoryId: data.category,
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
      const courses = await CourseModel.find({ mentorId });

      return courses ? courses.map((course) => courseMapping(course)) : null;
    } catch (error) {
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

//for convert the course from ICourses to Course
function courseMapping(course: ICourses): Course {
  const lessons = course.lessons
    ? course.lessons.map((lesson) => {
        if (
          typeof lesson === "object" &&
          "_id" in lesson &&
          "title" in lesson &&
          "description" in lesson
        ) {
          // Explicit cast to Partial<ILessons>
          const populatedLesson = lesson;
          return {
            id: populatedLesson._id?.toString() || null,
            title: populatedLesson.title as string,
            description: populatedLesson.description as string,
          };
        }
        // If lesson is not populated, treat it as ObjectId
        return {
          id: lesson.toString(),
          title: undefined,
          description: undefined,
        };
      })
    : [];

  return {
    id: course._id.toString(),
    title: course.title,
    mentorId: course.mentorId.toString(),
    category: (course.categoryId as ICategory).title || null,
    description: course.description || null,
    thumbnail: course.thumbnail,
    lessons: lessons,
    duration: course.duration || null,
    status: course.status || null,
    rejectionReason: course.rejectionReason || null,
    purchaseCount: course.purchaseCount || 0,
  };
}

export default CourseRepository;
