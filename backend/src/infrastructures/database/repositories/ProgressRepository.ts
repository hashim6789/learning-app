import { Progress } from "../../../application/entities/progress.entity";
import { IProgress } from "../interfaces/IProgress";
import ProgressModel from "../models/ProgressModel";
import mongoose, { ObjectId, PipelineStage } from "mongoose";
import { IProgressRepository } from "./interface/IProgressRepository";
import Course from "../../../application/entities/course.entity";

class ProgressRepository implements IProgressRepository {
  async createProgress(progress: Progress): Promise<Progress | null> {
    try {
      const newProgress = new ProgressModel(progress);
      const createdProgress = await newProgress.save();
      if (!createdProgress) return null;
      return mapToProgress(createdProgress);
    } catch (error) {
      throw new Error("An error creating the progress");
    }
  }

  async getProgressByUserAndCourse(
    userId: string,
    courseId: string
  ): Promise<Progress | null> {
    try {
      const progress = await ProgressModel.findOne({ userId, courseId }).exec();
      if (!progress) return null;
      return mapToProgress(progress);
    } catch (error) {
      throw new Error("An error creating the progress");
    }
  }

  async updateProgress(
    userId: string,
    courseId: string,
    updateData: Partial<Progress>
  ): Promise<Progress | null> {
    try {
      const updatedProgress = await ProgressModel.findOneAndUpdate(
        { userId, courseId },
        updateData,
        {
          new: true,
        }
      ).exec();
      if (!updatedProgress) return null;
      return mapToProgress(updatedProgress);
    } catch (error) {
      throw new Error("An error creating the progress");
    }
  }

  async fetchAllByUserId(userId: string): Promise<IProgress[] | null> {
    try {
      const progresses = await ProgressModel.find({ userId })
        .populate("courseId", "title thumbnail")
        .sort({
          createdAt: -1,
        });
      if (!progresses) return null;
      return progresses;
    } catch (error) {
      throw new Error("An error fetching the progresses");
    }
  }

  async fetchCourseProgressDetails(
    userId: string,
    courseId: string
  ): Promise<any | null> {
    try {
      const pipeline: PipelineStage[] = [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(courseId),
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        {
          $unwind: "$courseDetails",
        },
        {
          $lookup: {
            from: "lessons",
            localField: "courseDetails.lessons",
            foreignField: "_id",
            as: "allLessons",
          },
        },
        {
          $unwind: "$allLessons",
        },
        {
          $lookup: {
            from: "materials",
            localField: "allLessons.materials",
            foreignField: "_id",
            as: "allMaterials",
          },
        },
        {
          $unwind: "$allMaterials",
        },
        {
          $addFields: {
            "allMaterials.isCompleted": {
              $in: ["$allMaterials._id", "$completedMaterials"],
            },
          },
        },
        {
          $group: {
            _id: "$allLessons._id",
            lessonId: { $first: "$allLessons._id" },
            lessonTitle: { $first: "$allLessons.title" },
            lessonDuration: { $first: "$allLessons.duration" },
            materials: {
              $push: {
                id: "$allMaterials._id",
                title: "$allMaterials.title",
                description: "$allMaterials.description",
                type: "$allMaterials.type",
                duration: "$allMaterials.duration",
                fileKey: "$allMaterials.fileKey",
                isCompleted: "$allMaterials.isCompleted",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            id: "$lessonId",
            title: "$lessonTitle",
            duration: "$lessonDuration",
            materials: 1,
          },
        },
        {
          $sort: { id: 1 },
        },
      ];

      const progress = await ProgressModel.aggregate(pipeline);
      console.log("progress", progress);
      return progress;
    } catch (error) {
      throw new Error(`An error fetching the progresses : ${error as string}`);
    }
  }
  async fetchProgressById(progressId: string): Promise<Progress | null> {
    try {
      const progress = await ProgressModel.findById(progressId);
      if (!progress) return null;
      return mapToProgress(progress);
    } catch (error) {
      throw new Error(`An error fetching the progress : ${error as string}`);
    }
  }

  async updateProgressById(
    progressId: string,
    materialId: string
  ): Promise<Progress | null> {
    try {
      // Step 1: Add materialId to completedMaterials
      const result = await ProgressModel.findByIdAndUpdate(
        progressId,
        {
          $addToSet: {
            completedMaterials: new mongoose.Types.ObjectId(materialId),
          },
        },
        { new: true }
      ).populate("courseId");

      if (!result) {
        throw new Error("Progress document not found");
      }

      // Step 2: Populate course and lessons
      const progress = await ProgressModel.findById(progressId)
        .populate({
          path: "courseId",
          populate: {
            path: "lessons",
            model: "Lessons",
            populate: {
              path: "materials",
              model: "Materials",
            },
          },
        })
        .exec();

      if (!progress) {
        throw new Error("Progress document not found after update");
      }

      const course = progress.courseId as any; // Assuming courseId is populated as a Course type
      const completedMaterials = progress.completedMaterials as ObjectId[];

      // Step 3: Check if lessons are completed
      const completedLessons = new Set(
        progress.completedLessons.map((id) => id.toString())
      );
      for (const lesson of course.lessons) {
        const allMaterialsCompleted = lesson.materials.every((material: any) =>
          completedMaterials.some(
            (completedMaterial) =>
              completedMaterial.toString() === material._id.toString()
          )
        );

        if (allMaterialsCompleted) {
          completedLessons.add(lesson._id.toString());
        }
      }
      // Step 4: Update completedLessons in Progress document
      progress.completedLessons = Array.from(completedLessons).map(
        (id) =>
          new mongoose.Types.ObjectId(
            id
          ) as any as mongoose.Schema.Types.ObjectId
      );

      // Step 5: Update course completion status
      progress.isCourseCompleted =
        progress.completedLessons.length === course.lessons.length;

      // Step 6: Calculate and update progress
      const totalMaterialsCount = course.lessons.reduce(
        (acc: number, lesson: any) => acc + lesson.materials.length,
        0
      );
      const completedMaterialsCount = progress.completedMaterials.length;
      progress.progress = (completedMaterialsCount / totalMaterialsCount) * 100;

      await progress.save();

      return mapToProgress(progress);
    } catch (error) {
      throw new Error(
        `An error occurred while updating the progress: ${error as string}`
      );
    }
  }

  // async updateProgressById(
  //   progressId: string,
  //   materialId: string
  // ): Promise<Progress | null> {
  //   try {
  //     const result = await ProgressModel.findByIdAndUpdate(
  //       progressId,
  //       // { _id: new mongoose.Types.ObjectId(progressId) },
  //       {
  //         $addToSet: {
  //           completedMaterials: new mongoose.Types.ObjectId(materialId),
  //         },
  //       }
  //     );

  //     if (!result) return null;
  //     return mapToProgress(result);
  //   } catch (error) {
  //     throw new Error(`An error update the progress : ${error as string}`);
  //   }
  // }
}

function mapToProgress(doc: IProgress): Progress {
  return new Progress(
    doc._id.toString(),
    doc.userId.toString(),
    doc.courseId.toString(),
    doc.completedLessons.map((lessonId: ObjectId) => lessonId.toString()),
    doc.completedMaterials.map((materialId: ObjectId) => materialId.toString()),
    doc.isCourseCompleted,
    doc.progress,
    doc.completedDate ? doc.completedDate.getTime() : null
  );
}

export default ProgressRepository;
