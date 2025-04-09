import { getLogger } from "../../../utils/logger.js";
import { validateCodeSubmission } from "../../../utils/validator.js";
import { pushToQueue } from "../../../redis/queue/pushToQueue.js";
import { eventsList } from "../../eventsList.js";
import { generateUUID } from "../../../utils/generateUUID.js";
import { saveToDB } from "../../../redis/db/saveToDB.js";
const logger = getLogger(import.meta.url);
export const handleSubmitCode = async (socket, code) => {
  logger.info({
    log: "Handling submit code",
    code: code,
    socketId: socket.id,
  });
  try {
    const result = validateCodeSubmission(code);
    if (result?.error) {
      socket.emit(eventsList.code.emit.validationError, {
        result: result.error?.details?.map((detail) => detail.message),
      });
      return;
    }
    const { language, code: sourceCode, input } = result.value;
    const id = generateUUID();
    const savedToDB = await saveToDB(id, socket.id); // mapping socketId to id
    if (!savedToDB) {
      socket.emit(eventsList.code.emit.error, "Internal server error");
      return;
    }
    const data = {
      language,
      code: sourceCode,
      input,
      id,
    };
    await pushToQueue(JSON.stringify(data));
    logger.info({
      log: "Code submitted successfully",
      data: data,
    });
    socket.emit(eventsList.code.emit.queued, {
      message: "Code submitted successfully",
      data: data,
    });
  } catch (error) {
    logger.error({
      log: "Error submitting code",
      error: error,
    });
    socket.emit(eventsList.code.emit.error, "Internal server error");
  }
};
