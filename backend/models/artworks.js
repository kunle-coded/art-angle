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
  dimensions: { width: Number, height: Number, depth: Number },
  images: [String],
  editions: {
    type: String,
    enum: ["limited", "one"],
    required: true,
  },
  quantity: Number,
  availability: {
    type: String,
    enum: ["for sale", "not for sale", "sold"],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
  },
});

artworkSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Artwork = mongoose.model("Artwork", artworkSchema);

module.exports = Artwork;
