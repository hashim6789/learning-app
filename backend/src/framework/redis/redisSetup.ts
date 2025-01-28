import { createClient } from "redis";
import { config } from "../../shared/configs/config";

const redisClient = createClient({
  password: config.REDIS_PASSWORD,
  socket: {
    host: config.REDIS_HOST,
    port: parseInt(config.REDIS_PORT || "6379", 10),
  },
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
  process.exit(1);
});

const connectRedis = async () => {
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
      console.log("Redis connected");
    } catch (error) {
      console.error("Error connecting to Redis:", error);
      process.exit(1);
    }
  }
};

export { redisClient, connectRedis };
