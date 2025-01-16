import express from "express";
import MentorController from "../../controllers/MentorController";

const mentorRouter = express.Router();

mentorRouter.get("/", MentorController.fetchAllMentorsForAdmin);
mentorRouter.patch(
  "/:mentorId/block-unblock",
  MentorController.blockUnblockMentor
);

export default mentorRouter;
