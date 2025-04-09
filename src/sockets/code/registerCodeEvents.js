import { handleSubmitCode } from "./events/handleSubmitCode.js";
import { eventsList } from "../eventsList.js";  
export const registerCodeEvents = (socket) => {
  socket.on(eventsList.code.listen.submit, (code) => {
    handleSubmitCode(socket, code);
  });
};
