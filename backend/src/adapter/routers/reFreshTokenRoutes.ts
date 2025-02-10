import express, { Request, Response } from "express";
import { generateAccessToken } from "../../shared/utils/jwt"; // Import from your jwt file
import { generateRefreshToken } from "../../shared/utils/uuid";
import AdminRepository from "../../infrastructures/database/repositories/AdminRepository";
import cookieConfig from "../../shared/configs/cookieConfig";
import { Admin } from "../../application/entities/Admin";
import { Mentor } from "../../application/entities/Mentor";
import { Learner } from "../../application/entities/Learner";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";
import LearnerRepository from "../../infrastructures/database/repositories/LearnerRepository";
import { User } from "../../shared/types/User";

const adminRepository = new AdminRepository();
const mentorRepository = new MentorRepository();
const learnerRepository = new LearnerRepository();

const router = express.Router();

// Route to handle token refresh
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { refreshToken, user } = req.cookies;

  // Log request cookies for debugging
  // console.log("Request Cookies: ", req.cookies);

  if (!refreshToken) {
    res.status(400).json({ message: "Refresh token is required" });
    return;
  }

  let userData: null | Admin | Mentor | Learner = null;
  if (user === "admin") {
    userData = await adminRepository.findByToken(refreshToken);
  } else if (user === "mentor") {
    userData = await mentorRepository.findByRefreshToken(refreshToken);
  } else {
    userData = await learnerRepository.findByRefreshToken(refreshToken);
  }
  // Verify the refresh token
  if (!userData) {
    // Set new refresh token and access token as cookies
    res.cookie("refreshToken", "", { httpOnly: true });
    res.cookie("accessToken", "", { httpOnly: false });
    res.cookie("user", "", { httpOnly: true });
    res.status(403).json({ message: "Invalid refresh token" });
    return;
  }

  // Create a new access token
  const newAccessToken = generateAccessToken({
    userId: userData.id,
    role: user,
  });

  // Optionally, create a new refresh token (or reissue the same one)
  const newRefreshToken = generateRefreshToken();

  let refreshedUser: null | Admin | Mentor | Learner = null;
  if (user === "admin") {
    refreshedUser = await adminRepository.setRefreshTokenToDB(
      newRefreshToken,
      userData.id
    );
  } else if (user === "mentor") {
    refreshedUser = await mentorRepository.setRefreshToken(
      userData.id,
      newRefreshToken
    );
  } else {
    refreshedUser = await learnerRepository.setRefreshToken(
      userData.id,
      newRefreshToken
    );
  }

  if (!refreshedUser) {
    res.status(400).json({ message: "an error when storing refresh token" });
    return;
  }

  // Set new refresh token and access token as cookies
  res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
  res.cookie("accessToken", newAccessToken, { httpOnly: false });
  res.cookie("user", user, { httpOnly: true });

  // Respond with the new tokens
  res.status(200).json({
    success: true,
    message: "refreshed successfully!",
  });
});

export default router;
