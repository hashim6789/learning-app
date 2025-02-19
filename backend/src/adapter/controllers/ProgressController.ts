// src/adapters/controllers/ProgressController.ts
import { Request, Response, NextFunction } from "express";
// import { SendProgress } from "../../application/use_cases/progress/SendProgressUseCase";
import { Progress } from "../../application/entities/Progress";
// import { ProgressService } from "../../infrastructures/services/ProgressService";
import ProgressRepository from "../../infrastructures/database/repositories/ProgressRepository";
import GetAllProgressOfUserUseCase from "../../application/use_cases/progress/GetAllProgressesOfUserUseCase";
import GetProgressOfCourseUseCase from "../../application/use_cases/progress/GetProgressOfCourseUseCase";
import CreateSignedUrlForLearnerUseCase from "../../application/use_cases/progress/CreateSignedUrlForLearnerUseCase";
import UpdateProgressUseCase from "../../application/use_cases/progress/UpdateProgressUseCase";

// const progressService = new ProgressService(progressRepository);
// const sendProgress = new SendProgress(progressService);
const progressRepository = new ProgressRepository();
const getAllProgressOfUserUseCase = new GetAllProgressOfUserUseCase(
  progressRepository
);

const getProgressOfCourseUseCase = new GetProgressOfCourseUseCase(
  progressRepository
);

const createSignedUrlForLearnerUseCase = new CreateSignedUrlForLearnerUseCase(
  progressRepository
);

const updateProgressUseCase = new UpdateProgressUseCase(progressRepository);

export class ProgressController {
  constructor() {}

  //get progress of a user
  async getProgressesByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId || "";
      const response = await getAllProgressOfUserUseCase.execute(userId);
      if (response.success && response.data) {
        res
          .status(200)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  async getProgressDetailsOfUserAndCourse(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId || "";
      const { progressId } = req.params;
      const response = await getProgressOfCourseUseCase.execute(
        userId,
        progressId
      );
      if (response.success && response.data) {
        res
          .status(200)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
  async createSignedUrl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId || "";
      const { progressId } = req.params;
      const { fileKey, materialType } = req.body;
      const response = await createSignedUrlForLearnerUseCase.execute(
        userId,
        progressId,
        { fileKey, materialType }
      );
      if (response.success && response.data) {
        res
          .status(200)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
  async updateProgress(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId || "";
      const { progressId } = req.params;
      const { materialId } = req.body;
      const response = await updateProgressUseCase.execute(userId, progressId, {
        materialId,
      });
      if (response.success && response.data) {
        res
          .status(200)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
}
