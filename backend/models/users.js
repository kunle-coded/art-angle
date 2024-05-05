const mongoose = require("mongoose");

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
  artworks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
