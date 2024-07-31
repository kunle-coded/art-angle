const emptyObject = (res, object) => {
  if (Object.keys(object).length === 0) {
    res.status(401);
    throw new Error("No data to update");
  }
};

const generateImageName = (text) => {
  const part1 = text.slice(0, 7);
  const part2 = text.slice(7, 14);
  const part3 = text.slice(14);

  const fileName = `${part1}-aa-${part2}-${part3}`;
  return fileName;
};

module.exports = { emptyObject, generateImageName };
