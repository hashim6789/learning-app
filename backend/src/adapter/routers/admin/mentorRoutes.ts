import express from "express";
import MentorController from "../../controllers/MentorController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import GetMentorsUseCase from "../../../application/use_cases/admin/GetMentorsUseCase";
import MentorRepository from "../../../infrastructures/database/repositories/MentorRepository";
import BlockUnblockMentorUseCase from "../../../application/use_cases/admin/BlockUnBlockMentorUseCase";
import GetMentorByIdUseCase from "../../../application/use_cases/admin/GetMentorByIdUseCase";

const mentorRouter = express.Router();
const mentorRepository = new MentorRepository();
const getMentorsUseCase = new GetMentorsUseCase(mentorRepository);
const getMentorByIdUseCase = new GetMentorByIdUseCase(mentorRepository);
const blockUnblockMentorUseCase = new BlockUnblockMentorUseCase(
  mentorRepository
);
const mentorController = new MentorController(
  getMentorsUseCase,
  blockUnblockMentorUseCase,
  getMentorByIdUseCase
);

mentorRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  mentorController.fetchAllMentorsForAdmin.bind(mentorController)
);
mentorRouter.get(
  "/:mentorId",
  authenticateToken,
  authorizeRole(["admin"]),
  mentorController.fetchMentorForAdmin.bind(mentorController)
);
mentorRouter.patch(
  "/:mentorId/block-unblock",
  authenticateToken,
  authorizeRole(["admin"]),
  mentorController.blockUnblockMentor.bind(mentorController)
);

export default mentorRouter;
