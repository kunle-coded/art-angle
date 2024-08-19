export default function unitConverter(value, to) {
  let converted = 0;
  if (to === "in") {
    converted = Math.floor(value / 2.54);
  } else {
    converted = Math.floor(value * 2.54);
  }

  return converted;
}
