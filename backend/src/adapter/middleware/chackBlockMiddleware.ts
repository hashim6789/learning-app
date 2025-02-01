// import { Request, Response, NextFunction } from "express";
// import LearnerRepository from "../../infrastructures/database/repositories/LearnerRepository";
// import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";

// const learnerRepository = new LearnerRepository();
// const mentorRepository = new MentorRepository();

// // Authorization middleware to check the user role
// const checkBlocked = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const userRole = req.user?.role ?? "learner";
//   const userId = req.user?.userId || "";
//   let user = null;
//   if (userRole === "learner") {
//     user = await learnerRepository.fetchLearnerById(userId);
//   } else if (userRole === "mentor") {
//     user = await mentorRepository.fetchMentorById(userId);
//   } else {
//     return next();
//   }

//   // console.log("user block status", user?.isBlocked);

//   if (!user || user.isBlocked) {
//     res.status(403).json({
//       success: false,
//       message:
//         "You are blocked so, do not have permission to access this resource",
//     });
//   }
//   return next();
// };

// export default checkBlocked;

import { Request, Response, NextFunction } from "express";
import { Learner } from "../../application/entities/Learner";
import { Mentor } from "../../application/entities/Mentor";
import LearnerRepository from "../../infrastructures/database/repositories/LearnerRepository";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";

const learnerRepository = new LearnerRepository();
const mentorRepository = new MentorRepository();

const checkUserBlocked = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.clearCookie("user");
      res.status(403).json({ success: false, message: "Unauthorized access" });
      return;
    }

    const { userId, role } = req.user;

    let user: null | Learner | Mentor = null;
    if (role === "mentor") {
      user = await mentorRepository.fetchMentorById(userId);
    } else if (role === "learner") {
      user = await learnerRepository.fetchLearnerById(userId);
    }

    if (!user) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.clearCookie("user");
      res.status(403).json({ success: false, message: "User not found" });
      return;
    }

    if (user.isBlocked) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.clearCookie("user");
      res.status(403).json({
        success: false,
        message: "Access denied. Your account is blocked.",
      });
      return;
    }

    next(); // User is not blocked, proceed to next middleware
  } catch (error) {
    console.error("Error in checkUserBlocked middleware:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default checkUserBlocked;
