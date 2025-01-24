import session, { SessionOptions } from "express-session";
import dotenv from "dotenv";

dotenv.config();

// Load secret key from environment variables
const SESSION_SECRET = process.env.SESSION_SECRET || "default_secret";

if (!SESSION_SECRET) {
  throw new Error(
    "SESSION_SECRET is not defined in the environment variables."
  );
}

// Session configuration object
const sessionConfig: SessionOptions = {
  secret: SESSION_SECRET, // Secret for signing session cookies
  resave: false, // Avoid resaving unchanged sessions
  saveUninitialized: false, // Don't save uninitialized sessions
  cookie: {
    httpOnly: true, // Prevent client-side JavaScript access to cookies
    // secure: process.env.NODE_ENV === "production", // Secure cookies in production (requires HTTPS)
    maxAge: 1000 * 60 * 60 * 24, // Set cookie expiration (1 day in milliseconds)
    sameSite: "strict", // Prevent cross-site request forgery (CSRF)
  },
};

export default session(sessionConfig);
