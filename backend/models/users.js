const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    minLength: 3,
    required: true,
  },
  lastname: {
    type: String,
    minLength: 3,
    required: true,
  },
  email: {
    type: String,
    minLength: 3,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
  profileImageUrl: {
    type: String,
  },
  userType: {
    type: String,
    enum: ["buyer", "artist", "admin"],
    required: true,
  },
});

const artistSchema = new mongoose.Schema({
  contactNumber: {
    type: String,
    minLength: 5,
    required: true,
  },
  birthYear: {
    type: String,
  },
  nationality: {
    type: String,
  },
  biography: {
    type: String,
  },
  specialisation: {
    type: String,
  },
  portfolioLink: {
    type: String,
  },
  paymentDetails: {
    accountName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
  },
  artworks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Buyer",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
});

const buyerSchema = new mongoose.Schema({
  orders: [
    {
      orderId: { type: String, required: true },
      artworkId: { type: mongoose.Schema.Types.ObjectId, ref: "Artwork" },
      orderDate: Date,
      status: {
        type: String,
        enum: ["in progress", "completed"],
      },
    },
  ],
  offers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
  collections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.__t;
    delete returnedObject.password;
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified()) {
    next();
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

const Artist = User.discriminator("Artist", artistSchema);
const Buyer = User.discriminator("Buyer", buyerSchema);

module.exports = {
  Artist,
  Buyer,
  User,
};
