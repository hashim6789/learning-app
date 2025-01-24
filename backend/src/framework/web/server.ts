// Inbuilt Node.js modules
import express, { Application } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Custom configs
import corsConfig from "../../shared/configs/corsConfig";
import cookieConfig from "../../shared/configs/cookieConfig"; // Not used yet, so may be omitted if unnecessary
import sessionConfig from "../../shared/configs/sessionConfig";

// Importing router level routes
import refreshTokenRouter from "../../adapter/routers/reFreshTokenRoutes";
import learnerRouter from "../../adapter/routers/learner";
import adminRouter from "../../adapter/routers/admin";
import mentorRouter from "../../adapter/routers/mentor";

// Custom middlewares
import errorHandler from "../../adapter/middleware/errorHandler";

// DB connection setup
import connectDB from "../db/setup";

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Application = express();

// Middleware setups
app.use(morgan("dev")); // Request logging
app.use(corsConfig); // Enable CORS
app.use(express.json()); // Parse incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(sessionConfig); // Apply session configuration
app.use(cookieParser()); // Parse cookies
// app.use((req, res, next) => {
//   if (!req.session.user) {
//     req.session.user = {
//       userId: "",
//       role: "learner",
//     }; // Default empty Payload
//   }
//   next();
// });

// Route-level middlewares
app.use("/learner", learnerRouter);
app.use("/admin", adminRouter);
app.use("/mentor", mentorRouter);
app.use("/refresh", refreshTokenRouter);

// Error handling middleware (after routes to catch any errors)
app.use(errorHandler);

// Database connection setup
connectDB();

// Server configuration
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
