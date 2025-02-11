import express from "express";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import MentorController from "../../controllers/MentorController";
import checkUserBlocked from "../../middleware/checkBlockMiddleware";

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

//----------------------mentor mentor routes------------------------------//

/**
 * mentor mentor create route
 * endpoint - /mentor/mentors
 * method -  post
 * body - {title, description, materials, duration}
 * response - {success, message, data:mentor}
 */
mentorRouter.get(
  "/:mentorId/courses",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  mentorController.getMentorCoursesAnalytics
);

export default mentorRouter;
