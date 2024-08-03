const distributeArtworks = (artworks, numColumns) => {
  const columns = Array.from({ length: numColumns }, () => []);

  artworks.forEach((artwork, index) => {
    columns[index % numColumns].push(artwork);
  });

  return columns;
};

export default distributeArtworks;
