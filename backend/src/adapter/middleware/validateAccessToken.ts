// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// const validateAccessToken = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   // Ensure token is defined and is a string
//   if (!token) {
//     res.status(401).json({ message: "Access token is required" });
//   }

//   const jwtSecret = process.env.JWT_SECRET;
//   if (!jwtSecret) {
//     res.status(500).json({
//       message: "JWT_SECRET is not defined in the environment variables",
//     });
//   }

//   try {
//     // Ensure the token is a valid string before passing it to jwt.verify
//     const decoded = jwt.verify(token as string, jwtSecret as string);
//     req.user = decoded; // Attach user info to the request object (optional)
//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     res.status(401).json({ message: "Invalid or expired access token", error });
//   }
// };

// export default validateAccessToken;
