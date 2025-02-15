//imported the
import { Request, Response, NextFunction } from "express";
import { Learner } from "../../application/entities/Learner";
import { Mentor } from "../../application/entities/Mentor";
import LearnerRepository from "../../infrastructures/database/repositories/LearnerRepository";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";
import { Admin } from "../../application/entities/Admin";
import AdminRepository from "../../infrastructures/database/repositories/AdminRepository";

const learnerRepository = new LearnerRepository();
const mentorRepository = new MentorRepository();
const adminRepository = new AdminRepository();

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

    let user: null | Learner | Mentor | Admin = null;
    if (role === "mentor") {
      user = await mentorRepository.fetchById(userId);
    } else if (role === "learner") {
      user = await learnerRepository.fetchById(userId);
    } else if (role === "admin") {
      user = await adminRepository.fetchById(userId);
    }
    console.log(user);

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
