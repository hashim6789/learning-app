import express, { Request, Response } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../shared/utils/jwt"; // Import from your jwt file

const router = express.Router();

// Route to handle token refresh
router.post("/", (req: Request, res: Response): void => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ message: "Refresh token is required" });
    return;
  }

  // Verify the refresh token
  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    res.status(403).json({ message: "Invalid refresh token" });
    return;
  }

  // Create a new access token
  const newAccessToken = generateAccessToken({
    userId: decoded.userId,
    role: decoded.role,
  });

  // Optionally, create a new refresh token (or reissue the same one)
  const newRefreshToken = generateRefreshToken({
    userId: decoded.userId,
    role: decoded.role,
  });

  // Respond with the new tokens
  res.status(200).json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
});

export default router;
