import { CreateLessonDTO } from "../../../shared/dtos/createLessonDTO";
import Lesson from "../../../application/entities/lesson.entity";
import ILessonRepository from "./interface/ILessonRepository";
import LessonModel, { ILessons } from "../models/LessonModel";
import mongoose from "mongoose";
import { LessonQuery } from "../../../shared/types/filters";
import { BaseRepository } from "./base.repository";
import { LessonType } from "../../../shared/schemas/lesson.schema";

class LessonRepository
  extends BaseRepository<ILessons>
  implements ILessonRepository
{
  constructor() {
    super(LessonModel);
  }
  async fetchLessonById(lessonId: string): Promise<Lesson | null> {
    try {
      const lesson = await LessonModel.findById(lessonId).populate(
        "materials",
        "title _id duration"
      );
      return lesson ? mappedLesson(lesson) : null;
    } catch (error) {
      throw new Error("Failed to fetch the lesson");
    }
  }
  async fetchAllLessonsByMentorId(
    mentorId: string,
    { search = "", page = "1", limit = "10" }: LessonQuery
  ): Promise<{ lessons: Lesson[]; docCount: number } | null> {
    try {
      const query = {
        mentorId,
        title: { $regex: search, $options: "i" },
      };
      const lessons = await LessonModel.find(query)
        .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
        .limit(parseInt(limit, 10))
        .sort({
          createdAt: -1,
        });

      const totalCount = await LessonModel.countDocuments(query);

      if (!lessons) return null;
      const mappedLessons = lessons.map((lesson) => mappedLesson(lesson));

      return { lessons: mappedLessons, docCount: totalCount };
    } catch (error) {
      throw new Error("Failed to fetch the lessons");
    }
  }
  async updateLessonById(
    lessonId: string,
    data: Omit<LessonType, "duration">
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

  async fetchMentorLessonByTitle(
    mentorId: string,
    title: string
  ): Promise<Lesson | null> {
    try {
      const lesosn = await LessonModel.findOne({
        mentorId,
        title: { $regex: new RegExp(title, "i") },
      });

      if (!lesosn) return null;
      return mappedLesson(lesosn);
    } catch (error) {
      throw new Error("Failed to fetch material by title of the mentor");
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
    data: Omit<LessonType, "duration">,
    mentorId: string
  ): Promise<Lesson | null> {
    try {
      const materials = data.materials.map(
        (id) => new mongoose.Types.ObjectId(id)
      );
      const newLesson = new LessonModel({
        title: data.title,
        description: data.description,
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
  duration: number;
}

function mappedLesson(data: ILessons): Lesson {
  const id = data._id.toString();
  const mentorId = data.mentorId.toString();
  const materials = data.materials
    ? data.materials.map<Material>((material: any) => {
        return {
          id: material._id.toString(),
          title: material.title,
          duration: material.duration,
        };
      })
    : [];

  return new Lesson(id, data.title, mentorId, data.description, materials);
}

export default LessonRepository;
