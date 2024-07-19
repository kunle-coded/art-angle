const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const mime = require("mime-types");
const { AWS_USER_PROFILE } = require("./config");

const credentials = new AWS.SharedIniFileCredentials({
  profile: AWS_USER_PROFILE,
});
AWS.config.credentials = credentials;
AWS.config.update({ region: "eu-central-1" });

const s3 = new AWS.S3();

function deleteFileFromS3(filename) {
  const params = {
    Bucket: "artangle",
    Key: filename,
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log("Error deleting file", err);
        reject(new Error(err.message));
      } else {
        console.log("File deleted successfully");
        resolve();
      }
    });
  });
}

module.exports = { deleteFileFromS3 };
