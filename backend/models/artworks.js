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
  price: Number,
  dimensions: { width: Number, height: Number, depth: Number },
  images: [String],
  editions: {
    type: String,
    enum: ["limited", "one"],
    required: true,
  },
  totalRun: Number,
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

// availableForSale: "",
// weight: "",
// framed: false,
// frameDimensions: { width: "", height: "", depth: "" },
// packagingType: "",
// packagingInstructions: "",
// packagingWeight: 0,
// totalWeight: 0,
// shippingAddress: { city: "", state: "", country: "" },
// shippingCost: 0,
// price: 0,
// totalPrice: 0,

artworkSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Artwork = mongoose.model("Artwork", artworkSchema);

module.exports = Artwork;
