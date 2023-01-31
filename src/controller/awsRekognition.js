const { Rekognition } = require("aws-sdk");

const rekognition = new Rekognition({
  region: config.region, // like us-east-1
});
