import { CreateLessonDTO } from "../../../shared/dtos/createLessonDTO";
import Lesson from "../../../application/entities/Lesson";
import ILessonRepository from "../../../application/IRepositories/ILessonRepository";
import LessonModel, { ILessons } from "../models/LessonModel";
import mongoose from "mongoose";
import { LessonQuery } from "../../../shared/types/filters";

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

  return new Lesson(
    id,
    data.title,
    mentorId,
    data.description,
    materials,
    data.duration
  );
}

export default LessonRepository;
