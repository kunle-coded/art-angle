const baseUrl = "/api/artworks";

export async function getArtworks() {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
