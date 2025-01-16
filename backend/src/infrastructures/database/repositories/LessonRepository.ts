import { CreateLessonDTO } from "../../../shared/dtos/createLessonDTO";
import Lesson from "../../../application/entities/Lesson";
import ILessonRepository from "../../../application/IRepositories/ILessonRepository";
import LessonModel, { ILessons } from "../models/LessonModel";

class LessonRepository implements ILessonRepository {
  async fetchLessonById(lessonId: string): Promise<Lesson | null> {
    try {
      const lesson = await LessonModel.findById(lessonId);
      return lesson ? mappedLesson(lesson) : null;
    } catch (error) {
      throw new Error("Failed to fetch the lesson");
    }
  }
  async fetchAllLessonsByCourseId(courseId: string): Promise<Lesson[] | null> {
    try {
      const lessons = await LessonModel.find({ courseId });
      return lessons ? lessons.map(mappedLesson) : null;
    } catch (error) {
      throw new Error("Failed to fetch the lessons");
    }
  }
  async updateLessonById(
    lessonId: string,
    data: Partial<Lesson>
  ): Promise<Lesson | null> {
    try {
      const lesson = await LessonModel.findByIdAndUpdate(lessonId, data, {
        new: true,
      });
      return lesson ? mappedLesson(lesson) : null;
    } catch (error) {
      throw new Error("Failed to update the lesson");
    }
  }

  async deleteLessonById(lessonId: string): Promise<Lesson | null> {
    try {
      const lesson = await LessonModel.findByIdAndDelete(lessonId);
      return lesson ? mappedLesson(lesson) : null;
    } catch (error) {
      throw new Error("Failed to delete the lesson");
    }
  }
  async createLesson(data: CreateLessonDTO): Promise<Lesson | null> {
    try {
      const newLesson = new LessonModel(data);
      const createdLesson = await newLesson.save();

      return createdLesson ? mappedLesson(createdLesson) : null;
    } catch (error) {
      throw new Error("Failed to created the lesson");
    }
  }
}

function mappedLesson(data: ILessons): Lesson {
  const id = data._id.toString();
  const courseId = data.courseId.toString();

  return new Lesson(id, data.title, courseId, data.description, []);
}

export default LessonRepository;
