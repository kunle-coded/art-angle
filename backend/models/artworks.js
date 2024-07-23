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
  medium: [String],
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
  styles: [String],
  description: {
    type: String,
    minLength: 3,
    required: true,
  },
  keywords: [String],
  weight: Number,
  price: Number,
  dimensions: { width: Number, height: Number, depth: Number },
  images: [String],
  editions: {
    type: String,
    enum: ["Limited Edition", "One-of-a-kind"],
    required: true,
  },
  totalRun: Number,
  availability: {
    type: String,
    enum: ["For Sale", "Not For Sale", "Sold"],
    required: true,
  },
  availableForSale: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
  },
  framed: Boolean,
  frameDimensions: { width: Number, height: Number, depth: Number },
  packagingType: {
    type: String,
    enum: ["Tube", "Box", "Crate"],
  },
  packagingInstructions: String,
  packagingWeight: Number,
  totalWeight: Number,
  shippingAddress: { city: String, state: String, country: String },
  shippingCost: Number,
  totalPrice: Number,
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
