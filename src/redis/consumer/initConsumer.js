import { handleGetSubmittedCode } from "../../sockets/code/events/handleGetSubmittedCode.js";
import { getLogger } from "../../utils/logger.js";
import { getFromDB } from "../db/getFromDB.js";
import { removeFromDB } from "../db/removeFromDB.js";
import { redisPubSub } from "../redisSetup.js";
const logger = getLogger(import.meta.url);
export const initConsumer = async (job) => {
  try {
    logger.info({
      log: "Consuming job",
      job: job,
    });
    const listener = async (message) => {
      logger.info({
        log: "Received message",
        message: message,
      });
      const data = JSON.parse(message);
      logger.info({
        log: "Data",
        data: data,
      });
      const socketId = await getFromDB(data.id);
      logger.info({
        log: "Socket ID",
        socketId: socketId,
      });
      if (socketId) {
        await handleGetSubmittedCode(socketId, data.result);
        await removeFromDB(data.id);
      }
    };
    await redisPubSub.subscribe("pubsub", listener);
  } catch (error) {
    logger.error({
      log: "Error consuming job",
      error: error,
    });
    throw error;
  }
};
