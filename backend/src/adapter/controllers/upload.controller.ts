//imported dtos for check the body credentials
//imported the entities
//imported the repositories
//imported the use cases
//created the instances
//mentor controller
//mentor signup

import { NextFunction, Request, Response } from "express";
import UploadCourseImageUseCase from "../../application/use_cases/mentor/course-upload-thumbnail.usecase";
import S3Service from "../../application/services/s3.service";

export class UploadController {
  constructor(private uploadFileUseCase: UploadCourseImageUseCase) {}

  async uploadFile(req: Request, res: Response): Promise<void> {
    try {
      const file = req.file!;
      const url = await this.uploadFileUseCase.execute(file);
      console.log("uploaded url");
      res.status(200).json({ url });
    } catch (error) {
      // Ensure error is of type `Error` to safely access `message`
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }

  async uploadMaterial(req: Request, res: Response, next: NextFunction) {
    try {
      const { fileName, fileType, materialType } = req.body;

      try {
        const s3Service = new S3Service();
        const url = await s3Service.putObject(fileName, materialType, fileType);

        console.log(url);

        if (!url) {
          res.status(400).json({
            success: true,
            message: "The signed url cannot be generated!",
          });
        }

        res.status(200).json({
          success: true,
          message: "The signed url generated successfully",
          data: {
            signedUrl: url,
            fileKey: fileName,
          },
        });
      } catch (error) {
        res.status(500).json({
          message: error,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
