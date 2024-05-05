const express = require("express");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const artworkRoutes = require("./routes/artworkRoutes");

const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRoutes);
app.use("/api", artworkRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
