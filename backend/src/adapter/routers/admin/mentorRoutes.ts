import express from "express";
import MentorController from "../../controllers/MentorController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";

//mentorController instance created.
const mentorController = new MentorController();

//mentorRouter is created,
const mentorRouter = express.Router();

//----------------------mentor routes------------------------------//

/**
 * mentors get route
 * endpoint - /admin/mentors
 * method -  get
 * body - {}
 * response - {success, message, data:mentors}
 */
mentorRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  mentorController.fetchAllMentorsForAdmin
);

/**
 * mentor get route
 * endpoint - /admin/mentors/:mentorId
 * method -  get
 * params - {mentorID}
 * response - {success, message, data:mentor}
 */
mentorRouter.get(
  "/:mentorId",
  authenticateToken,
  authorizeRole(["admin"]),
  mentorController.fetchMentorForAdmin
);

/**
 * mentor block unblock route
 * endpoint - /admin/mentors/:mentorId/block-unblock
 * method -  get
 * params - {mentorID}
 * response - {success, message, data:mentor}
 */
mentorRouter.patch(
  "/:mentorId/block-unblock",
  authenticateToken,
  authorizeRole(["admin"]),
  mentorController.blockUnblockMentor
);

export default mentorRouter;
