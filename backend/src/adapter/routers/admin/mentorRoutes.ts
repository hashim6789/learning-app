import express from "express";
import MentorController from "../../controllers/MentorController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";

const mentorRouter = express.Router();

mentorRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  MentorController.fetchAllMentorsForAdmin
);
mentorRouter.patch(
  "/:mentorId/block-unblock",
  authenticateToken,
  authorizeRole(["admin"]),
  MentorController.blockUnblockMentor
);

export default mentorRouter;
