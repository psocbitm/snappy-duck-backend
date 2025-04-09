import { redisQueue } from "../redisSetup.js";
import { getLogger } from "../../utils/logger.js";
const logger = getLogger(import.meta.url);
export const pushToQueue = async (data) => {
  try {
    await redisQueue.lPush("queue", data);
  } catch (error) {
    logger.error({
      log: "Error pushing to queue",
      error: error,
    });
    throw error;
  }
};
