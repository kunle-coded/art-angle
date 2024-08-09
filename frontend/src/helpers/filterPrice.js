import formatCurrency from "../helpers/formatCurrency";
import { MAX_FILTER_PRICE } from "../constants";

function filterPrice(minValue, maxValue) {
  if (minValue === 0 && maxValue === MAX_FILTER_PRICE) {
    return null;
  }

  const formatMin = formatCurrency(minValue);
  const formatMax = formatCurrency(maxValue);

  let price;

  if (maxValue === undefined) {
    price = `Over ${formatMin}`;
    console.log("filter price", maxValue, price);
  }

  if (minValue === undefined) {
    price = `Under ${formatMax}`;
  }

  if (minValue !== undefined && maxValue !== undefined) {
    price = `${formatMin} - ${formatMax}`;
  }

  // const priceInput = `${formatMin}${maxValue === MAX_FILTER_PRICE ? "+" : "-"}${
  //   maxValue === MAX_FILTER_PRICE ? "" : formatMax
  // }`;

  return price;
}

export default filterPrice;
