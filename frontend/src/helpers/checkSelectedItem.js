const checkSelectedItems = (item, list) => {
  const isItemSelected = list.some((listItem) => listItem.value === item);

  return isItemSelected;
};

export default checkSelectedItems;
