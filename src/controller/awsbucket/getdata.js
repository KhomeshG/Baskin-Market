const aws = require("aws-sdk");
const publishToQueue = require("../rabbitmq");
const imageSchema = require("../../model/imageSchema");
require("dotenv").config();
const bucketName = process.env.BUCKET_NAME;

//From S3Bucket Cloud
module.exports.getData = async (req, res) => {
  let s3 = new aws.S3({ apiVersion: "2006-03-02" });
  var params = { Bucket: bucketName, Key: "abc/googleLogo (.jpg" };

  s3.getObject(params, async (err, data) => {
    err && console.log("error", err);
    // data && console.log("Upload Sucess", data.Location, data);
    if (data != null) {
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.write(data.Body, "binary");
      res.end(null, "binary");
    } else {
      return res.status(404).send({ err: err.message, msg: "Not found" });
    }

    // console.log(data, data.Body);
    // await publishToQueue.publishToQueue("user-message1", data.Body);
  });
};

//From MongoDB

//Get Whole Data FromBucket
module.exports.getAllData = async (req, res) => {
  try {
    let s3 = new aws.S3({ apiVersion: "2006-03-02" });
    var params = { Bucket: bucketName, Prefix: "abc/", Delimiter: "/" };
    s3.listObjectsV2(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });

    res.send({ msg: true });
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "server Error", err: err.message });
  }
};
module.exports.deleteData = async (bucket, object) => {
  let s3 = new aws.S3({ apiVersion: "2006-03-02" });
  var params = { Bucket: bucket, Key: object };
  s3.deleteObject(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });

  console.log("deleted S");
};
