import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../../shared/utils/jwt"; // Adjust the path to your jwt.ts

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    res.status(401).json({ success: false, message: "Access Token Required" });
    return;
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or Expired Token" });
    return;
  }

  // req.user = decoded; // Assign the decoded payload directly
  next();
};

export default authenticateToken;
