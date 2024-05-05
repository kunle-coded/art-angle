const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 3,
    required: true,
  },
  artist: {
    type: String,
    minLength: 3,
    required: true,
  },
  published: String,
  medium: {
    type: String,
    minLength: 3,
    required: true,
  },
  materials: [String],
  category: {
    type: String,
    minLength: 3,
    required: true,
  },
  subject: {
    type: String,
    minLength: 3,
    required: true,
  },
  style: {
    type: String,
    minLength: 3,
    required: true,
  },
  description: {
    type: String,
    minLength: 3,
    required: true,
  },
  keywords: [String],
  price: Number,
  dimensions: { width: 15, height: 10, depth: 0.1 },
  images: [String],
  editions: {
    type: String,
    minLength: 3,
    required: true,
  },
  availability: {
    type: String,
    minLength: 3,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
