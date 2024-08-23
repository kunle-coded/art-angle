function searchList(list = [], itemToSearch = "") {
  let newList = [];
  const searchResult = list.filter((listItem) =>
    listItem.toLocaleLowerCase().includes(itemToSearch.toLocaleLowerCase())
  );
  const materialsRest = list.filter(
    (listItem) =>
      !listItem.toLocaleLowerCase().includes(itemToSearch.toLocaleLowerCase())
  );

  if (searchResult.length >= 1) {
    newList = [...searchResult, ...materialsRest];
  } else {
    newList = [];
  }

  return newList;
}

export default searchList;
