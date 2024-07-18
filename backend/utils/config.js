require("dotenv").config();
const PORT = process.env.PORT;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGDBO_URI
    : process.env.MONGODB_URI;

const JWT_SECRET = process.env.JWT_SECRET;
const AWS_USER_PROFILE = process.env.AWS_USER_PROFILE;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

module.exports = {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  AWS_USER_PROFILE,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
};
