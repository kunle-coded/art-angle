import formatCurrency from "../helpers/formatCurrency";
import { MAX_FILTER_PRICE } from "../constants/constants";

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

  if ((!isMinValueValid || minVal === 0) && isMaxValueValid) {
    formatMax = formatCurrency(maxValue);
    price = `Under ${formatMax}`;
  } else if (
    isMinValueValid &&
    (!isMaxValueValid || maxVal === MAX_FILTER_PRICE)
  ) {
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
