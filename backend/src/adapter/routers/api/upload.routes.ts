import { Router, Request, Response } from "express";
import { UploadController } from "../../controllers/upload.controller";
import { upload } from "../../../shared/configs/multerConfig";
import {
  s3Upload,
  getObjectUrl,
  putObject,
  deleteFileFromS3,
} from "../../middleware/upload.middleware";
import { CloudinaryService } from "../../../application/services/cloudinary.service";
import UploadCourseImageUseCase from "../../../application/use_cases/mentor/course-upload-thumbnail.usecase";
import authenticateToken from "../../middleware/authenticate.middleware";
import authorizeRole from "../../middleware/authorize.middleware";
import checkUserBlocked from "../../middleware/check-blocked.middleware";

//authController instance created.
const uploadRouter = Router();

//uploadRouter is created,
// Dependency injection
const cloudinaryService = new CloudinaryService();
const uploadFileUseCase = new UploadCourseImageUseCase(cloudinaryService);
const uploadController = new UploadController(uploadFileUseCase);

// Route for file upload
uploadRouter.post(
  "/course-img",
  authenticateToken,
  authorizeRole(["mentor"]),
  upload.single("file"),
  (req, res) => uploadController.uploadFile(req, res)
);

uploadRouter.post(
  "/signed-url",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  uploadController.uploadMaterial
);

uploadRouter.post("/get-signed-url", async (req: Request, res: Response) => {
  const { fileKey, materialType } = req.body;

  try {
    const url = await getObjectUrl(fileKey, materialType);

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
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

uploadRouter.post("/upload", s3Upload, (req: Request, res: Response) => {
  if (req.fileUrl) {
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      fileUrl: req.fileUrl, // Return file URL
    });
  } else {
    res.status(400).json({ success: false, message: "File upload failed" });
  }
});

// // Route to delete a file from S3
// uploadRouter.delete("/delete", async (req: Request, res: Response) => {
//   const { fileKey } = req.body; // File key to delete

//   if (!fileKey) {
//     res.status(400).json({ success: false, message: "File key is required" });
//     return;
//   }

//   try {
//     await deleteFileFromS3(fileKey);
//     res
//       .status(200)
//       .json({ success: true, message: "File deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error deleting file" });
//   }
// });

export default uploadRouter;
