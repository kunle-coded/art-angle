import formatCurrency from "../helpers/formatCurrency";
import { MAX_FILTER_PRICE } from "../constants";

function filterPrice(minValue, maxValue) {
  const formatMin = formatCurrency(minValue);
  const formatMax = formatCurrency(maxValue);

  const priceInput = `${formatMin}${maxValue === MAX_FILTER_PRICE ? "+" : "-"}${
    maxValue === MAX_FILTER_PRICE ? "" : formatMax
  }`;

  if (minValue === 0 && maxValue === MAX_FILTER_PRICE) {
    return null;
  } else {
    return priceInput;
  }
}

export default filterPrice;
