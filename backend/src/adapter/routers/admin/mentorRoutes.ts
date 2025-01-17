import express from "express";
import MentorController from "../../controllers/MentorController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import GetMentorsUseCase from "../../../application/use_cases/admin/GetMentorsUseCase";
import MentorRepository from "../../../infrastructures/database/repositories/MentorRepository";
import BlockUnblockMentorUseCase from "../../../application/use_cases/admin/BlockUnBlockMentorUseCase";

const mentorRouter = express.Router();
const mentorRepository = new MentorRepository();
const getMentorsUseCase = new GetMentorsUseCase(mentorRepository);
const blockUnblockMentorUseCase = new BlockUnblockMentorUseCase(
  mentorRepository
);
const mentorController = new MentorController(
  getMentorsUseCase,
  blockUnblockMentorUseCase
);

mentorRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  mentorController.fetchAllMentorsForAdmin.bind(mentorController)
);
mentorRouter.patch(
  "/:mentorId/block-unblock",
  authenticateToken,
  authorizeRole(["admin"]),
  mentorController.blockUnblockMentor.bind(mentorController)
);

export default mentorRouter;
