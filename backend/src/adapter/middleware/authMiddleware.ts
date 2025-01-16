import { Request, Response, NextFunction } from "express";

export const authenticate = (
  validateAccessToken: (token: string) => Promise<any>,
  refreshAccessToken: (refreshToken: string) => Promise<string>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1];
      const refreshToken = req.headers["x-refresh-token"] as string;

      if (!accessToken) {
        return res.status(401).json({ message: "Access token is missing." });
      }

      // Validate Access Token
      let validationResponse = await validateAccessToken(accessToken);

      // Refresh Access Token if validation fails
      if (!validationResponse.success && refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          validationResponse = await validateAccessToken(newAccessToken);

          if (!validationResponse.success) {
            return res
              .status(403)
              .json({ message: "Invalid or expired token." });
          }

          //   // Set the new access token for downstream use
          //   res.setHeader("x-new-access-token", newAccessToken);
        } catch (err) {
          return res.status(401).json({ message: "Unable to refresh token." });
        }
      }

      // Attach user payload to the request
      req.user = validationResponse.data;
      next();
    } catch (error) {
      return res.status(500).json({ message: "Authentication error.", error });
    }
  };
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({
        message: "You do not have permission to access this resource.",
      });
    }

    next();
  };
};
