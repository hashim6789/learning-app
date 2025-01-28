import { Request, Response } from "express";
import UploadCourseImageUseCase from "../../application/use_cases/mentor/UploadCourseImageUseCase";

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
}
