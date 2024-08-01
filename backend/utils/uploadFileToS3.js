const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const mime = require("mime-types");
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require("./config");
const { generateImageName } = require("./helpers");

// const credentials = new AWS.SharedIniFileCredentials({
//   profile: AWS_USER_PROFILE,
// });
// AWS.config.credentials = credentials;
AWS.config.update({
  region: "eu-central-1",
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

function uploadFileToS3(folderName, file, id) {
  const contentType = file.mimetype || mime.lookup(file.originalname);
  const fileName = `${generateImageName(id)}-${file.originalname}`;

  const params = {
    Bucket: "artangle",
    Key: `${folderName}/${fileName}`,
    Body: file.buffer,
    ContentType: contentType,
  };

  return new Promise((resolve, reject) => {
    console.log("Starting headObject check...");
    s3.headObject(
      { Bucket: params.Bucket, Key: params.Key },
      (err, metadata) => {
        if (err) {
          if (err.code === "NotFound") {
            console.log("File not found, proceeding with upload...");
            s3.upload(params, (err, data) => {
              if (err) {
                console.log("Error uploading file", err);
                reject(new Error(err.message));
              } else {
                console.log(
                  "File uploaded successfully. File location: ",
                  data.Location
                );
                resolve(data.Location);
              }
            });
          } else {
            console.log("Error checking if file exists", err);
            reject(new Error(err.message));
          }
        } else {
          console.log("File already exists at this location:", params.Key);
          reject(new Error("File already exists"));
        }
      }
    );
  });
}

module.exports = { uploadFileToS3 };

// AWSReservedSSO_PowerUserAccess_86551d895212458e/kunle-dev
