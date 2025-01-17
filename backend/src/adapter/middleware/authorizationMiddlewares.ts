import { Request, Response, NextFunction } from "express";

// Authorization middleware to check the user role
const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // const userRole = req.user.role; // Get the user's role from the decoded token
    const userRole = "admin";
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

export default authorizeRole;
