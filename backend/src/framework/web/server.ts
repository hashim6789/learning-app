// Inbuilt Node.js modules
import express, { Application } from "express";
import dotenv from "dotenv";
import http from "http";
import "reflect-metadata";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Custom configs
import corsConfig from "../../shared/configs/corsConfig";
// import cookieConfig from "../../shared/configs/cookieConfig"; // Not used yet, so may be omitted if unnecessary
// import sessionConfig from "../../shared/configs/sessionConfig";

// Importing router level routes
import refreshTokenRouter from "../../adapter/routers/reFreshTokenRoutes";

import apiRouter from "../../adapter/routers/api";

// Custom middlewares
import errorHandler from "../../adapter/middleware/error-handling.middleware";

// Redis connection setup
import { connectRedis } from "../redis/redisSetup";

// DB connection setup
import connectDB from "../db/dbSetup";

// SOCKET connection setup
import { connectSocket } from "../socket/socketSetup";

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Application = express();

// Middleware setups
app.use(morgan("dev")); // Request logging
app.use(corsConfig); // Enable CORS
app.use(express.json()); // Parse incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
// app.use(sessionConfig); // Apply session configuration
app.use(cookieParser()); // Parse cookies

// Redis cache connection setup
// connectRedis();

// Database connection setup
connectDB();

// Route-level middlewares
// app.use("/learner", learnerRouter);
// app.use("/admin", adminRouter);
// app.use("/mentor", mentorRouter);
app.use("/refresh", refreshTokenRouter);
app.use("/api", apiRouter);

// Error handling middleware (after routes to catch any errors)
app.use(errorHandler);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = connectSocket(server);

// Server configuration
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
