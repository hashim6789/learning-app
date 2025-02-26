import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../../shared/utils/jwt.util";
import session from "express-session";

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

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

  req.user = decoded;
  next();
};

export default authenticateToken;
