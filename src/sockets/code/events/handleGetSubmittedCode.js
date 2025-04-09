import { eventsList } from "../../eventsList.js";
import { getIo } from "../../initSocket.js";
import { getLogger } from "../../../utils/logger.js";
const logger = getLogger(import.meta.url);
export const handleGetSubmittedCode = async (socketId, result) => {
  try {
    const io = getIo();
    const socket = io.sockets.sockets.get(socketId);
    if (!socket) {
      logger.error({
        log: "Socket not found",
        socketId,
      });
      throw new Error("Socket not found");
    }
    socket.emit(eventsList.code.emit.getSubmission, result);
    logger.info({
      log: "Submitted code sent",
      socketId,
      result,
    });
  } catch (error) {
    logger.error({
      log: "Error handling get submitted code",
      error: error,
    });
    throw error;
  }
};
