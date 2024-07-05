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
const artworksTwo = [
  {
    id: 0,
    title: "N-220",
    artist: "John Ndambo",
    dimensions: "119.38cm x 91.44cm",
    medium: "Painting on canvas",
    price: "1,318,000",
    year: "2020",
    url: "../assets/images/artist-yusuf.png",
  },
  {
    id: 1,
    title: "Through The Day",
    artist: "Nii Hylton",
    dimensions: "119.38cm x 91.44cm",
    medium: "Painting",
    price: "3,318,000",
    year: "2019",
    url: "ad-image3.png",
  },
  {
    id: 2,
    title: "Unconfined",
    artist: "Michael Oguguo",
    dimensions: "119.38cm x 91.44cm",
    medium: "Canvas on stretcher",
    price: "1,818,000",
    year: "2019",
    url: "../assets/images/artist-samuel.png",
  },
  {
    id: 3,
    title: "The Goddess",
    artist: "Michael Oguguo",
    dimensions: "119.38cm x 91.44cm",
    medium: "Sculpture",
    price: "1,408,000",
    year: "2022",
    url: "../assets/images/artist-idubor.png",
  },
  {
    id: 4,
    title: "Two Prayers As One",
    artist: "Angu Walters",
    dimensions: "119.38cm x 91.44cm",
    medium: "Print on canvas",
    price: "2,201,000",
    year: "2020",
    url: "./gaze-of-hope-card.png",
  },
  {
    id: 5,
    title: "Hidden",
    artist: "Steven Kiswanta",
    dimensions: "119.38cm x 91.44cm",
    medium: "Canvas on stretcher",
    price: "550,000",
    year: "2019",
    url: "../assets/images/artist-browne.png",
  },
  {
    id: 6,
    title: "At Rest",
    artist: "Paul Omidiran",
    dimensions: "119.38cm x 91.44cm",
    medium: "Sculpture",
    price: "1,107,500",
    year: "2021",
    url: "./benin-head.png",
  },
  {
    id: 7,
    title: "Village Life",
    artist: "Joseph Thiongo",
    dimensions: "119.38cm x 91.44cm",
    medium: "Print on canvas",
    price: "385,650",
    year: "2019",
    url: "./sliderImg3.png",
  },
];
const artworksThree = [
  {
    id: 0,
    title: "Stay With Me",
    artist: "Gbemileke Adekunle",
    dimensions: "119.38cm x 91.44cm",
    medium: "Oil on canvas",
    price: "5,318,000",
    year: "2020",
    url: "/assets/images/stay-with-me.webp",
  },
  {
    id: 1,
    title: "Stone Cold",
    artist: "Ayobami Adelaye",
    dimensions: "122.38cm x 91.44cm",
    medium: "Charcoal on canvas",
    price: "2,650,000",
    year: "2019",
    url: "/assets/images/stone-cold.webp",
  },
  {
    id: 2,
    title: "Me And Cosmo",
    artist: "Oluwaseun Akinlo",
    dimensions: "91cm x 76cm",
    medium: "Oil on canvas",
    price: "1,818,000",
    year: "2019",
    url: "/assets/images/me-and-cosmo.webp",
  },
  {
    id: 3,
    title: "The Chosen",
    artist: "Alabi",
    dimensions: "61.38cm x 51.44cm",
    medium: "Sculpture",
    price: "1,908,000",
    year: "2022",
    url: "/assets/images/the-chosen.webp",
  },
  {
    id: 4,
    title: "The Flower Girl",
    artist: "Oluwafunmilayo Arabambi",
    dimensions: "122cm x 91cm",
    medium: "Acrylic",
    price: "5,700,000",
    year: "2020",
    url: "/assets/images/the-flower-girl.webp",
  },
  {
    id: 5,
    title: "In Movement",
    artist: "Omoyeni Arogunmati",
    dimensions: "61cm x 56cm",
    medium: "Oil on canvas",
    price: "1,950,000",
    year: "2019",
    url: "/assets/images/in-movement.webp",
  },
  {
    id: 6,
    title: "Soulmate 5",
    artist: "Damola Ayegbayo",
    dimensions: "121.38cm x 91.44cm",
    medium: "Acrylic on canvas",
    price: "3,370,000",
    year: "2021",
    url: "/assets/images/soulmate-5.webp",
  },
  {
    id: 7,
    title: "Entwined I",
    artist: "Elizabeth Chioma",
    dimensions: "137cm x 183cm",
    medium: "Charcoal on canvas",
    price: "6,880,000",
    year: "2019",
    url: "/assets/images/entwined-I.webp",
  },
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
    imgUrl: "/assets/images/artist-yusuf.png",
  },
  {
    id: 1,
    name: "Cornelius Browne",
    nationality: "Nigerian",
    category: "Photography",
    imgUrl: "/assets/images/artist-browne.png",
  },
  {
    id: 2,
    name: "Tolu Aliki",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/images/artist-aliki.png",
  },
  {
    id: 3,
    name: "Uzoma Samuel",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/images/artist-samuel.png",
  },
  {
    id: 4,
    name: "Nelson Okoh",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/images/artist-okoh.png",
  },
  {
    id: 5,
    name: "Felix Idubor",
    nationality: "Nigerian",
    category: "Sculpture",
    imgUrl: "/assets/images/artist-idubor.png",
  },
  {
    id: 6,
    name: "Dan Mbo",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/images/artist-mbo.png",
  },
  {
    id: 7,
    name: "Steve Ekpenisi",
    nationality: "Nigerian",
    category: "Sculpture",
    imgUrl: "/assets/images/artist-ekpenisi.png",
  },
  {
    id: 8,
    name: "Oladipupo Adesina",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/images/artist-adesina.png",
  },
  {
    id: 9,
    name: "Divine Effiong",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/images/artist-effiong.png",
  },
  {
    id: 10,
    name: "Gbemileke Adekunle",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/artists/gbemi-adekunle.webp",
  },
  {
    id: 11,
    name: "Ayobami Adelaye",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/artists/ayo-adeleye.webp",
  },
  {
    id: 12,
    name: "Oluwaseun Akinlo",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/artists/oluwaseun-akinlo.webp",
  },
  {
    id: 13,
    name: "Alabi",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/artists/alabi.webp",
  },
  {
    id: 14,
    name: "Oluwafunmilayo Arabambi",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/artists/oluwafunmilayo-arabambi.webp",
  },
  {
    id: 15,
    name: "Omoyeni Arogunmati",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/artists/omoyeni-arogunmati.webp",
  },
  {
    id: 16,
    name: "Damola Ayegbayo",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/artists/damola-ayegbayo.webp",
  },
  {
    id: 17,
    name: "Elizabeth Chioma",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/artists/elizabeth-chioma.webp",
  },
  {
    id: 18,
    name: "Ayoola Gbolahan",
    nationality: "Nigerian",
    category: "Sculpture",
    imgUrl: "/assets/artists/ayoola-gbolahan.webp",
  },
  {
    id: 19,
    name: "Wande George",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/artists/wande-george.webp",
  },
  {
    id: 20,
    name: "Nzennaya Ikechukwu",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/artists/nzennaya-ikechukwu.webp",
  },
  {
    id: 21,
    name: "Gabriel Jideonwor",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/artists/gabriel-jideonwor.webp",
  },
  {
    id: 22,
    name: "Adubi Makinde",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/artists/adubi-makinde.webp",
  },
  {
    id: 23,
    name: "Kehinde Omolayo",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/artists/kehinde-omolayo.webp",
  },
  {
    id: 24,
    name: "Temi Wynston",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "/assets/artists/temi-wynston.webp",
  },
  {
    id: 25,
    name: "Nii Hylton",
    nationality: "Ghanaian",
    category: "Painting",
    imgUrl: "authority.png",
  },
  {
    id: 26,
    name: "John Ndambo",
    nationality: "Kenyan",
    category: "Painting",
    imgUrl: "cat-modern.png",
  },
  {
    id: 27,
    name: "Steven Kiswanta",
    nationality: "Tanzanian",
    category: "Painting",
    imgUrl: "gaze-of-hope-card.png",
  },
  {
    id: 28,
    name: "Angu Walters",
    nationality: "Cameroonian",
    category: "Painting",
    imgUrl: "sliderImg3.png",
  },
  {
    id: 29,
    name: "Michael Oguguo",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "sliderImg4.png",
  },
  {
    id: 30,
    name: "Paul Omidiran",
    nationality: "Nigerian",
    category: "Painting",
    imgUrl: "ad-image2.png",
  },
  {
    id: 31,
    name: "Joseph Thiongo",
    nationality: "Kenyan",
    category: "Painting",
    imgUrl: "boss-lady.png",
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

const categoriesList = [
  "Contemporary Art",
  "Abstract Art",
  "Emerging Art",
  "Minimalism",
  "Pop Art",
  "Street Art",
  "Impressionist & Modern Art",
  "20th-Century Art",
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

const styles = [
  "Modern",
  "Documentary",
  "Conceptual",
  "Renaissance",
  "Minimalism",
  "Classism",
];

const subjects = [
  "Portraiture",
  "Landscape",
  "Still life",
  "Animal",
  "Non-objective",
  "Botanic",
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
const colorCodes = [
  "#bb392d",
  "#ea6b1f",
  "#e2b929",
  "#00674a",
  "#0a1ab4",
  "#7b3d91",
  "#000",
  "#7b5927",
  "#c2c2c2",
  "#e1adcd",
];

const artGalleries = [
  "Nike Art Gallery",
  "Terra Kulture",
  "National Museum Lagos",
  "Omenka Gallery",
  "Art Twenty One",
  "Didi Museum",
  "Thought Pyramid Art Centre",
  "National Gallery of Modern Art (NGMA)",
  "Kelechi Amadi-Obi Studio",
  "African Artists' Foundation (AAF)",
  "Goodman Gallery",
  "Zeitz Museum of Contemporary Art Africa (MOCAA)",
  "SMAC Gallery",
  "Gallery MOMO",
  "October Gallery",
  "Retro Africa",
  "Afriart Gallery",
  "Circle Art Gallery",
  "Raw Material Company",
  "Zoma Museum",
];

const locations = [
  "Lagos, Nigeria",
  "Abuja, Nigeria",
  "Cape Town, South Africa",
  "Johannesburg, South Africa",
  "Dakar, Senegal",
  "Addis Ababa, Ethiopia",
  "Kampala, Uganda",
  "Nairobi, Kenya",
  "London, United Kingdom",
];

const countries = [
  "Afghanistan",
  "Åland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia, Plurinational State of",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo, Democratic Republic of the",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran, Islamic Republic of",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, Democratic People's Republic of",
  "Korea, Republic of",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova, Republic of",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "North Macedonia",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan, Province of China",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States Minor Outlying Islands",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela, Bolivarian Republic of",
  "Viet Nam",
  "Virgin Islands, British",
  "Virgin Islands, U.S.",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export {
  artworks,
  artworksTwo,
  artworksThree,
  slides,
  categories,
  artworksByPrice,
  artists,
  events,
  categoriesList,
  materials,
  medium,
  styles,
  subjects,
  rarity,
  waysToBuy,
  timePeriod,
  colors,
  colorCodes,
  artGalleries,
  locations,
  countries,
};
