import { createClient } from "redis";

let redisClient = null;

if (process.env.REDIS_URL) {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URL,
      socket: {
        tls: true,
        rejectUnauthorized: false,
      },
    });

    redisClient.on("error", (err) => {
      console.log("Redis Error:", err.message);
    });

    await redisClient.connect();

    console.log("Connected to Upstash Redis");

  } catch (error) {
    console.log("Redis connection failed:", error.message);
    redisClient = null;
  }
} else {
  console.log("No REDIS_URL provided");
}

export default redisClient;
