import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if headers are already sent
  if (res.headersSent) {
    // Delegate to the default Express error handler
    return next(err);
  }

  if (err instanceof Error) {
    res.status(400).json({ success: false, error: err.message });
  } else {
    res
      .status(500)
      .json({ success: false, error: "An unknown error occurred" });
  }
};
