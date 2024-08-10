import formatCurrency from "../helpers/formatCurrency";
import { MAX_FILTER_PRICE } from "../constants/constants";

// function filterPrice(minValue, maxValue) {
//   // if (minValue === 0 && maxValue === MAX_FILTER_PRICE) {
//   //   return null;
//   // }
//   let formatMin, formatMax;

//   let price;

// if (minValue !== undefined && maxValue === undefined) {
//   formatMin = formatCurrency(minValue);
//   price = `Over ${formatMin}`;
//   console.log("filter price min", minValue, price);
//   return price;
// }

// if (maxValue !== undefined && minValue === undefined) {
//   formatMax = formatCurrency(maxValue);
//   price = `Under ${formatMax}`;
//   console.log("filter price max", maxValue, price);
//   return price;
// }

// if (minValue !== undefined && maxValue !== undefined) {
//   formatMin = formatCurrency(minValue);
//   formatMax = formatCurrency(maxValue);
//   price = `${formatMin} - ${formatMax}`;
// }

//   // const priceInput = `${formatMin}${maxValue === MAX_FILTER_PRICE ? "+" : "-"}${
//   //   maxValue === MAX_FILTER_PRICE ? "" : formatMax
//   // }`; (minValue !== undefined && maxValue !== undefined)

//   return price;
// }

function filterPrice(minValue, maxValue) {
  let formatMin, formatMax;
  let price;

  const minVal = Number(minValue);
  const maxVal = Number(maxValue);

  if (minVal === 0 && maxVal === MAX_FILTER_PRICE) {
    return null;
  }

  // Check if minValue and maxValue are valid numbers
  const isMinValueValid = Number.isFinite(minVal);
  const isMaxValueValid = Number.isFinite(maxVal);

  console.log(minVal, maxVal);

  if (!isMinValueValid && isMaxValueValid) {
    formatMax = formatCurrency(maxValue);
    price = `Under ${formatMax}`;
  } else if (isMinValueValid && !isMaxValueValid) {
    formatMin = formatCurrency(minValue);
    price = `Over ${formatMin}`;
  } else if (isMinValueValid && isMaxValueValid) {
    formatMin = formatCurrency(minValue);
    formatMax = formatCurrency(maxValue);
    price = `${formatMin} - ${formatMax}`;
  } else {
    price = "Invalid price range";
  }

  return price;
}

export default filterPrice;
