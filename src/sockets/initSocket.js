import { Server } from "socket.io";
import { getLogger } from "../utils/logger.js";
import { registerSocketEvents } from "./registerSocketEvents.js";

let io;
const logger = getLogger(import.meta.url);

const handleSocketConnection = (socket) => {
  const logClientCount = () => {
    logger.info(`Total clients connected: ${io.sockets.sockets.size}`);
  };

  logger.info(`Client connected: ${socket.id}`);
  logClientCount();

  socket.on("disconnect", () => {
    logger.info(`Client disconnected: ${socket.id}`);
    logClientCount();
  });

  socket.on("error", (error) => {
    logger.error({
      log: "Error on socket",
      error,
    });
  });

  registerSocketEvents(socket);
};

export const initSocket = (server) => {
  try {
    io = new Server(server, {
      cors: { origin: "*" },
    });

    logger.info({ log: "Socket initialized" });
    io.on("connection", handleSocketConnection);
  } catch (error) {
    logger.error({
      log: "Error initializing socket",
      error,
    });
  }
};

export const getIo = () => {
  if (!io) {
    throw new Error("Socket not initialized");
  }
  return io;
};
