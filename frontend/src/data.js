const artworks = [
  {
    id: 0,
    title: "When we were young",
    artist: "Oladipupo Adesina",
    dimensions: "119.38cm x 91.44cm",
    medium: "Painting on canvas",
    price: "3,318,000",
    year: "2020",
    url: "./when-we-were-young.png",
  },
  {
    id: 1,
    title: "Traditional Dancer",
    artist: "Uche Edozie",
    dimensions: "119.38cm x 91.44cm",
    medium: "Photography",
    price: "3,318,000",
    year: "2019",
    url: "./traditional-dancer.png",
  },
  {
    id: 2,
    title: "Gaze of Hope",
    artist: "Durodola Yusuf",
    dimensions: "119.38cm x 91.44cm",
    medium: "Canvas on stretcher",
    price: "3,318,000",
    year: "2019",
    url: "./gaze-of-hope.png",
  },
  {
    id: 3,
    title: "Our Neighbourhood",
    artist: "Divine Effiong",
    dimensions: "119.38cm x 91.44cm",
    medium: "Painting on canvas",
    price: "3,318,000",
    year: "2022",
    url: "./our-neighbourhood.png",
  },
  {
    id: 4,
    title: "Nolstagia Beauty I",
    artist: "Uzoma Samuel",
    dimensions: "119.38cm x 91.44cm",
    medium: "Print on canvas",
    price: "3,318,000",
    year: "2020",
    url: "./nostalgia-beauty.png",
  },
  {
    id: 5,
    title: "Boss Lady II",
    artist: "Tolu Aliki",
    dimensions: "119.38cm x 91.44cm",
    medium: "Canvas on stretcher",
    price: "3,318,000",
    year: "2019",
    url: "./boss-lady.png",
  },
  {
    id: 6,
    title: "Friends",
    artist: "Tola Wewe",
    dimensions: "119.38cm x 91.44cm",
    medium: "Painting on canvas",
    price: "1,777,500",
    year: "2021",
    url: "./friends.png",
  },
  {
    id: 7,
    title: "African Queen",
    artist: "Cornelius Browne",
    dimensions: "119.38cm x 91.44cm",
    medium: "Print on canvas",
    price: "547,650",
    year: "2019",
    url: "./african-queen.png",
  },
  //   {
  //     id: 8,
  //     title: "Purple House",
  //     artist: "Steve Ekpenisi",
  //     dimensions: "119.38cm x 91.44cm",
  //     medium: "Painting on canvas",
  //     price: "2,370,000",
  //     year: "2022",
  //     url: "./purple-house.png",
  //   },
  //   {
  //     id: 9,
  //     title: "Expression",
  //     artist: "Nelson Okoh",
  //     dimensions: "119.38cm x 91.44cm",
  //     medium: "Sculpture",
  //     price: "1,422,000",
  //     year: "2020",
  //     url: "./expression.png",
  //   },
];

const slides = [
  {
    id: 0,
    title: "When we were young",
    artist: "Oladipupo Adesina",
    dimensions: "119.38cm x 91.44cm",
    medium: "Painting on canvas",
    year: "2020",
    url: "./sliderImg0.png",
  },
  {
    id: 1,
    title: "Traditional Dancer",
    artist: "Uche Edozie",
    dimensions: "119.38cm x 91.44cm",
    medium: "Painting on canvas",
    year: "2019",
    url: "./sliderImg1.png",
  },
  {
    id: 2,
    title: "Gaze of Hope",
    artist: "Durodola Yusuf",
    dimensions: "119.38cm x 91.44cm",
    medium: "Canvas on stretcher",
    year: "2019",
    url: "./sliderImg2.png",
  },
  {
    id: 3,
    title: "Our Neighbourhood",
    artist: "Divine Effiong",
    dimensions: "119.38cm x 91.44cm",
    medium: "Painting on canvas",
    year: "2022",
    url: "./sliderImg3.png",
  },
  {
    id: 4,
    title: "Nolstagia Beauty I",
    artist: "Uzoma Samuel",
    dimensions: "119.38cm x 91.44cm",
    medium: "Painting on canvas",
    year: "2020",
    url: "./sliderImg4.png",
  },
];

const categories = [
  {
    id: 0,
    title: "Contemporary Art",
    url: "./cat-contemporary.png",
  },
  {
    id: 1,
    title: "Abstract Art",
    url: "./cat-abstract.png",
  },
  {
    id: 2,
    title: "Emerging Art",
    url: "./cat-emerging.png",
  },

  {
    id: 3,
    title: "Minimalism",
    url: "./cat-minimalism.png",
  },
  {
    id: 4,
    title: "Pop Art",
    url: "./cat-pop.png",
  },
  {
    id: 5,
    title: "Street Art",
    url: "./cat-street.png",
  },
  {
    id: 6,
    title: "Impressionist & Modern Art",
    url: "./cat-modern.png",
  },
  {
    id: 7,
    title: "20th-Century Art",
    url: "./cat-artworks.png",
  },
];

const artworksByPrice = [
  {
    id: 0,
    title: "Benin Head",
    artist: "Felix Idubor",
    price: "177,750",
    url: "./benin-head.png",
  },
  {
    id: 1,
    title: "Purple House",
    artist: "Uzoma Samuel",
    price: "230,760",
    url: "./friends.png",
  },
  {
    id: 2,
    title: "Expression",
    artist: "Steve Ekpenisi",
    price: "222,000",
    url: "./expression-card.png",
  },
  {
    id: 3,
    title: "Gaze of Hope",
    artist: "Nelson Okoh",
    price: "202,000",
    url: "./gaze-of-hope-card.png",
  },
  {
    id: 4,
    title: "Colors",
    artist: "Dan Mbo",
    price: "242,400",
    url: "./cat-contemporary.png",
  },
  {
    id: 5,
    title: "Authority",
    artist: "Micheal Maseli",
    price: "210,450",
    url: "./authority.png",
  },
];

const artists = [
  {
    id: 0,
    name: "Durodola Yusuf",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "artist-yusuf.png",
  },
  {
    id: 1,
    name: "Cornelius Browne",
    nationality: "Nigerian",
    category: "Photography",
    imgUrl: "artist-browne.png",
  },
  {
    id: 2,
    name: "Tolu Aliki",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "artist-aliki.png",
  },
  {
    id: 3,
    name: "Uzoma Samuel",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "artist-samuel.png",
  },
  {
    id: 4,
    name: "Nelson Okoh",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "artist-okoh.png",
  },
  {
    id: 5,
    name: "Felix Idubor",
    nationality: "Nigerian",
    category: "Sculpture",
    imgUrl: "artist-idubor.png",
  },
  {
    id: 6,
    name: "Dan Mbo",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "artist-mbo.png",
  },
  {
    id: 7,
    name: "Steve Ekpenisi",
    nationality: "Nigerian",
    category: "Sculpture",
    imgUrl: "artist-ekpenisi.png",
  },
  {
    id: 8,
    name: "Oladipupo Adesina",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "artist-adesina.png",
  },
  {
    id: 9,
    name: "Divine Effiong",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "artist-effiong.png",
  },
];

const events = [
  {
    id: 0,
    title: "Art x Lagos 2024",
    date: "Oct 31 - Nov 3, 2024",
    imgUrl: "art-x-fair.jpeg",
  },
  {
    id: 1,
    title: "New Directions 2024",
    date: "Mar 30 - Apr 27, 2024",
    imgUrl: "new-directions.jpeg",
  },
  {
    id: 2,
    title: "Peju Alatise: Perceptions",
    date: "Jul 8 - Aug 11, 2024",
    imgUrl: "perceptions.png",
  },
];

const materials = [
  "Acrylic",
  "Aluminium",
  "Aquatint",
  "Arches paper",
  "Art Paper",
  "Blown Glas",
  "Brass",
  "Bronze",
  "C-print",
  "Canvas",
  "Cardboard",
  "Ceramic",
  "Chalk",
  "Charcoal",
  "Clay",
  "Collage",
  "Concrete",
  "Copper",
  "Cotton",
  "Crystal",
  "Digital",
  "Drypoint",
  "Dye",
  "Earthenware",
  "Embroidery",
  "Enamel",
  "Engraving",
  "Epoxy",
  "Etching",
  "Foam",
  "Giclée",
  "Glass",
  "Glaze",
  "Gold",
  "Gouache",
  "Graphite",
  "Ink",
  "Inkjet print",
  "Iron",
  "Lacquer",
  "Laid paper",
  "Leaf",
  "Leather",
  "Linen",
  "Linocut",
  "Lithograph",
  "Mahogany",
  "Marble",
  "Metal",
  "Mixed media",
  "Monoprint",
  "Monotype",
  "Oak",
  "Oil",
  "Paint",
  "Panel",
  "Paper",
  "Pastel",
  "Pastina",
  "Pencil",
  "Pigment",
  "Plaster",
  "Plastic",
  "Platinum",
  "Plexiglass",
  "Polaroid",
  "Polyurethane",
  "Porcelain",
  "Powder",
  "Rag paper",
  "Resin",
  "Screen print",
  "Silk",
  "Silver",
  "Silver gelatin",
  "Sound",
  "Spray paint",
  "Stainless steel",
  "Steel",
  "Stone",
  "Stoneware",
  "Teak",
  "Thread",
  "Upholstery",
  "Video",
  "Vinyl",
  "Walnut",
  "Wash",
  "Watercolor",
  "Wire",
  "Wood",
  "Woodcut",
  "Wool",
  "Wove paper",
];

const medium = [
  "Painting",
  "Photography",
  "Sculpture",
  "Prints",
  "Work on Paper",
  "Drawing",
  "Design",
  "Textile",
];
const rarity = ["Unique", "Limited Edition", "Open Edition", "Unknown Edition"];

const waysToBuy = ["Purchase", "Make Offer", "Bid", "Contact Gallery"];

const timePeriod = [
  "2020s",
  "2010s",
  "2000s",
  "1990s",
  "1980s",
  "1970s",
  "1960s",
  "1950s",
  "1940s",
  "1930s",
  "1920s",
  "1910s",
  "1900s",
  "Late 19th Century",
  "Mid 19th Century",
  "Early 19th Century",
  "18th Century & Earlier",
];

const colors = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Black and White",
  "Brown",
  "Gray",
  "Pink",
];

export {
  artworks,
  slides,
  categories,
  artworksByPrice,
  artists,
  events,
  materials,
  medium,
  rarity,
  waysToBuy,
  timePeriod,
  colors,
};
