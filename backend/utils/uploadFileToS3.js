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

function uploadFileToS3(folderName, file) {
  const contentType = file.mimetype || mime.lookup(file.originalname);
  // const fileName = `${uuidv4()}-${file.originalname}`;
  const fileName = `${uuidv4()}-${file.originalname}`;

  const params = {
    Bucket: "artanglebucket",
    Key: `${folderName}/${fileName}`,
    Body: file.buffer,
    ContentType: contentType,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log("Error uploading file", err);
      throw new Error(err.message);
    } else {
      console.log("File uploaded successfully. File location: ", data.Location);
      return data.Location;
    }
  });
}

module.exports = { uploadFileToS3 };
