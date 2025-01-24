import { Request, Response, NextFunction } from "express";
import LearnerRepository from "../../infrastructures/database/repositories/LearnerRepository";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";

const learnerRepository = new LearnerRepository();
const mentorRepository = new MentorRepository();

// Authorization middleware to check the user role
const checkBlocked = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRole = req.user?.role ?? "learner";
  const userId = req.user?.userId || "";
  let user = null;
  if (userRole === "learner") {
    user = await learnerRepository.fetchLearnerById(userId);
  } else if (userRole === "mentor") {
    user = await mentorRepository.fetchMentorById(userId);
  } else {
    return next();
  }

  console.log("user block status", user?.isBlocked);

  if (!user || user.isBlocked) {
    res.status(403).json({
      success: false,
      message:
        "You are blocked so, do not have permission to access this resource",
    });
  }
  return next();
};

export default checkBlocked;
