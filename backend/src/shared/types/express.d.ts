import { Payload } from "../utils/jwt"; // Adjust the path as per your project

declare global {
  namespace Express {
    interface Request {
      user: Payload = "learner";
    }
  }
}
