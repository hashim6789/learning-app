import { ICloudinaryService } from "../../services/cloudinary.service";

class UploadCourseImageUseCase {
  constructor(private cloudinaryService: ICloudinaryService) {}

  async execute(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error("File not provided");
    }

    const url = await this.cloudinaryService.uploadImage(file);
    console.log("url :", url);
    return url;
  }
}

export default UploadCourseImageUseCase;
