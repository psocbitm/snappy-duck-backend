import { redisDB } from "../redisSetup.js";
import { getLogger } from "../../utils/logger.js";
const logger = getLogger(import.meta.url);
export const getFromDB = async (id) => {    
  try {
    const result = await redisDB.hGet("map", id);
    logger.info({
      log: "Got from DB",
      id: id,
      result: result,
    });
    return result;
  } catch (error) {
    logger.error({
      log: "Error getting from DB",
      error: error,
    });
    throw error;
  }
};
