import express from "express";
import http from "http";
import { initSocket } from "../sockets/initSocket.js";
import cors from "cors";
import { getLogger } from "../utils/logger.js";
import { setupRedis } from "../redis/redisSetup.js";
import { initConsumer } from "../redis/consumer/initConsumer.js";
const logger = getLogger(import.meta.url);
export const setupApp = async () => {
  try {
    const app = express();
    // Middlewares
    app.use(express.json());
    app.use(cors());

    // health check
    app.get("/health", (req, res) => {
      res.status(200).json({
        status: "ok",
      });
    });

    // Redis
    logger.info({
      log: "Setting up Redis",
    });
    await setupRedis();
    await initConsumer();
    logger.info({
      log: "Redis setup complete",
    });
    // Socket
    const server = http.createServer(app);
    logger.info({
      log: "Setting up Socket",
    });
    initSocket(server);

    // Return
    return server;
  } catch (error) {
    logger.error({
      log: "Error setting up app",
      error: error.message,
    });
    throw error;
  }
};
