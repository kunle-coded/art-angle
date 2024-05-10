const asyncHandler = require("express-async-handler");
const { Buyer, Artist, User } = require("../models/users");
const Artwork = require("../models/artworks");

// @desc Favourite Artist
// route PUT /api/artist/favourite
// @access Private
const addToFavouriteArtsist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const artistId = req.params.id;

  const buyer = await Buyer.findById(userId).lean();

  // Check if the favourite already includes the artistId
  const isInList = buyer.favouriteArtists.some((artistItemId) =>
    artistItemId.equals(artistId)
  );

  if (isInList) {
    await Buyer.findByIdAndUpdate(
      userId,
      { $pull: { favouriteArtists: artistId } },
      { new: true }
    );
    res
      .status(201)
      .json({ message: "Artist successfully removed from favourites" });
  } else {
    await Buyer.findByIdAndUpdate(
      userId,
      { $push: { favouriteArtists: artistId } },
      { new: true }
    );
    res
      .status(201)
      .json({ message: "Artist successfully added to favourites" });
  }
});

module.exports = {
  addToFavouriteArtsist,
};
