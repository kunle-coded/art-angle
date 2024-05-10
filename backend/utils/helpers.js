const { v4: uuidv4 } = require("uuid");

const emptyObject = (res, object) => {
  if (Object.keys(object).length === 0) {
    res.status(401);
    throw new Error("No data to update");
  }
};

const generateId = () => {
  const id = uuidv4();
  return id;
};

module.exports = { emptyObject, generateId };
