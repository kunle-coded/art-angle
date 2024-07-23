const express = require("express");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const artworkRoutes = require("./routes/artworkRoutes");
const baseRoutes = require("./routes/baseRoutes");
const productRoutes = require("./routes/productRoutes");
const artistRoutes = require("./routes/artistRoutes");
const imageRoutes = require("./routes/imageRoutes");

const { uploadFileToS3 } = require("./utils/uploadFileToS3");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Routes
app.use("/api", baseRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user/artworks", artworkRoutes);
app.use("/api/user/artworks/image", imageRoutes);
app.use("/api/artwork", productRoutes);
app.use("/api/artist", artistRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
