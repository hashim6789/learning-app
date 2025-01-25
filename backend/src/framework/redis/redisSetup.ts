import { createClient } from "redis";
import { config } from "../../shared/configs/config";

const connectRedis = async () => {
  const client = createClient({
    password: config.REDIS_PASSWORD,
    socket: {
      host: config.REDIS_HOST,
      port: parseInt(config.REDIS_PORT || "6379", 10),
    },
  });

  client.on("error", (err) => {
    console.error("Redis Client Error", err);
    process.exit(1);
  });

  try {
    await client.connect();
    console.log("Redis connected");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    process.exit(1);
  }
};

export default connectRedis;
