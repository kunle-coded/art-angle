const emptyObject = (res, object) => {
  if (Object.keys(object).length === 0) {
    res.status(401);
    throw new Error("No data to update");
  }
};

const capitalizeFirstChar = (string = "") => {
  if (!string) return;

  return string[0].toUpperCase() + string.slice(1);
};

const generateImageName = (text) => {
  const part1 = text.slice(0, 7);
  const part2 = text.slice(7, 14);
  const part3 = text.slice(14);

  const fileName = `${part1}-aa-${part2}-${part3}`;
  return fileName;
};

const generateMultipleQueries = (string) => {
  const singleQuery = string
    .split(/[+-]/)
    .map((item) => capitalizeFirstChar(item))
    .join(" ");

  const multipleQuery = string.includes("+")
    ? string.split("+").map((part) => {
        return part
          .split("-")
          .map((item) => capitalizeFirstChar(item))
          .join(" ");
      })
    : singleQuery;

  const queryValue = Array.isArray(multipleQuery)
    ? { $in: multipleQuery }
    : singleQuery;

  return queryValue;
};

module.exports = {
  emptyObject,
  capitalizeFirstChar,
  generateImageName,
  generateMultipleQueries,
};
