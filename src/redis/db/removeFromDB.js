import { redisDB } from "../redisSetup.js";
import { getLogger } from "../../utils/logger.js";
const logger = getLogger(import.meta.url);
export const removeFromDB = async (id) => {
  try {
    await redisDB.hDel("map", id);
    logger.info({
      log: "Removed from DB",
      id: id,
      redisDBSize: await redisDB.hLen("map"),
    });
    return true;
  } catch (error) {
    logger.error({
      log: "Error removing from DB",
      error: error,
    });
    return false;
  }
};
