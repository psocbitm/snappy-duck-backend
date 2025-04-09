import { setupApp } from "./app/setupApp.js";
import { getLogger } from "./utils/logger.js";

export const startServer = async () => {
  const logger = getLogger(import.meta.url);
  try {
    const server = await setupApp();
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
  } catch (error) {
    logger.error({
      log: "Error starting server",
      error: error,
    });
    process.exit(1);
  }
};
