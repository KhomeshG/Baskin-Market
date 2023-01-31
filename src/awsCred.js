const aws = require("aws-sdk");
require("dotenv").config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secrectAcessKey = process.env.SECRET_ACCESS_KEY;

aws.config.update({
  accessKeyId: accessKey,
  secretAccessKey: secrectAcessKey,
  region: bucketRegion,
});

// this Expression function will upload file to aws and return the link
let uploadFile = async (file, res) => {
  try {
    let s3 = new aws.S3({ apiVersion: "2006-03-01" });

    var uploadParams = {
      Bucket: bucketName,
      Key: "abc/" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, (err, data) => {
      err && console.log("error", err);
      data && console.log("Upload Sucess", data.Location);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { uploadFile };
