import { getLogger } from "../../utils/logger.js";
import { redisDB } from "../redisSetup.js";
const logger = getLogger(import.meta.url);
export const saveToDB = async (id, socketId) => {
  try {
    const result = await redisDB.hSet("map", id, socketId);
    logger.info({
      log: "Saved to DB",
      result: result,
    });
    return true;
  } catch (error) {
    logger.error({
      log: "Error saving to DB",
      error: error,
    });
    return false;
  }
};
