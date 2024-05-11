const emptyObject = (res, object) => {
  if (Object.keys(object).length === 0) {
    res.status(401);
    throw new Error("No data to update");
  }
};

module.exports = { emptyObject };
