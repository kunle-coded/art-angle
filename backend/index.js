const app = require("./app");
const mongoose = require("mongoose");
const { MONGODB_URI, PORT } = require("./utils/config");
const logger = require("./utils/logger");

mongoose
  .connect(MONGODB_URI, { dbName: "artangle" })
  .then((result) => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.info("Error connecting to MongoDB", error.message);
  });

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}...`);
});
