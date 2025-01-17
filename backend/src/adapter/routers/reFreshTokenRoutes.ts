import express, { Request, Response } from "express";
import { generateAccessToken } from "../../shared/utils/jwt"; // Import from your jwt file
import { generateRefreshToken } from "../../shared/utils/uuid";
import AdminRepository from "../../infrastructures/database/repositories/AdminRepository";
import cookieConfig from "../../shared/configs/cookieConfig";

const adminRepository = new AdminRepository();

const router = express.Router();

// Route to handle token refresh
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.cookies;

  // Log request cookies for debugging
  // console.log("Request Cookies: ", req.cookies);

  if (!refreshToken) {
    res.status(400).json({ message: "Refresh token is required" });
    return;
  }

  // Verify the refresh token
  const admin = await adminRepository.findByToken(refreshToken);
  console.log(admin);
  if (!admin) {
    res.status(403).json({ message: "Invalid refresh token" });
    return;
  }

  // Create a new access token
  const newAccessToken = generateAccessToken({
    userId: admin.id,
    role: "admin",
  });

  // Optionally, create a new refresh token (or reissue the same one)
  const newRefreshToken = generateRefreshToken();

  // Set new refresh token and access token as cookies
  res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
  res.cookie("accessToken", newAccessToken, { httpOnly: false });

  // Respond with the new tokens
  res.status(200).json({
    success: true,
    message: "refreshed successfully!",
  });
});

export default router;
