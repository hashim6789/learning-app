import { Request, Response, NextFunction } from "express";
import { User } from "../../shared/types/User";

// Authorization middleware to check the user role
export const authorizeRole = (allowedRoles: User[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role ?? "learner";
    if (!userRole) {
      res.status(403).json({ success: false, message: "User role is missing" });
    }

    if (allowedRoles.includes(userRole)) {
      return next(); // User has the required role, proceed to the next middleware or controller
    }

    res.status(403).json({
      success: false,
      message: "You do not have permission to access this resource",
    });
  };
};
