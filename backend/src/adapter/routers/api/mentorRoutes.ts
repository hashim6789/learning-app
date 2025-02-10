import express from "express";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import MentorController from "../../controllers/MentorController";
import checkUserBlocked from "../../middleware/checkBlockMiddleware";

//mentorController instance created.
const mentorController = new MentorController();

//mentorRouter is created,
const mentorRouter = express.Router();

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
