import { CreateLessonDTO } from "../../../shared/dtos/createLessonDTO";
import Lesson from "../../../application/entities/Lesson";
import ILessonRepository from "../../../application/IRepositories/ILessonRepository";
import LessonModel, { ILessons } from "../models/LessonModel";
import mongoose from "mongoose";

class LessonRepository implements ILessonRepository {
  async fetchLessonById(lessonId: string): Promise<Lesson | null> {
    try {
      const lesson = await LessonModel.findById(lessonId).populate(
        "materials",
        "title _id"
      );
      return lesson ? mappedLesson(lesson) : null;
    } catch (error) {
      throw new Error("Failed to fetch the lesson");
    }
  }
  async fetchAllLessonsByMentorId(mentorId: string): Promise<Lesson[] | null> {
    try {
      const lessons = await LessonModel.find({ mentorId }).sort({
        createdAt: -1,
      });
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
  async createLesson(
    data: CreateLessonDTO,
    mentorId: string
  ): Promise<Lesson | null> {
    try {
      const materials = data.materials.map(
        (id) => new mongoose.Types.ObjectId(id)
      );
      const newLesson = new LessonModel({
        title: data.title,
        description: data.description,
        duration: data.duration,
        mentorId,
        materials,
      });
      const createdLesson = await newLesson.save();

      return createdLesson ? mappedLesson(createdLesson) : null;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

interface Material {
  id: string;
  title: string;
}

function mappedLesson(data: ILessons): Lesson {
  const id = data._id.toString();
  const mentorId = data.mentorId.toString();
  const materials = data.materials
    ? data.materials.map<Material>((material: any) => {
        return { id: material._id.toString(), title: material.title };
      })
    : [];

  return new Lesson(id, data.title, mentorId, data.description, materials, 0);
}

export default LessonRepository;
