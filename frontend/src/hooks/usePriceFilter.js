import { useDispatch } from "react-redux";
import { removePriceItem, updatePrice } from "../reducers/filterSlice";
import formatCurrency from "../helpers/formatCurrency";
import { MAX_FILTER_PRICE } from "../constants";

function usePriceFilter(minValue, maxValue) {
  const dispatch = useDispatch();

  const formatMin = formatCurrency(minValue);
  const formatMax = formatCurrency(maxValue);

  const priceInput = `${formatMin}${maxValue === MAX_FILTER_PRICE ? "+" : "-"}${
    maxValue === MAX_FILTER_PRICE ? "" : formatMax
  }`;

  if (minValue === 0 && maxValue === MAX_FILTER_PRICE) {
    dispatch(removePriceItem());
  } else {
    dispatch(updatePrice(priceInput));
  }
}

export default usePriceFilter;
