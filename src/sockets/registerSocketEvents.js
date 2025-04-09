import { registerCodeEvents } from "./code/registerCodeEvents.js";

export const registerSocketEvents = (socket) => {
  registerCodeEvents(socket);
};
