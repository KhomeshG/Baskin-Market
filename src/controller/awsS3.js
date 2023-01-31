//aws client
//this S3Client i am using to intracte with my s3 bucket
const { S3Client } = require("@aws-sdk/client-s3-node/S3Client");

const {
  PutObjectCommand,
} = require("@aws-sdk/client-s3-node/commands/PutObjectCommand");

//dotenv
require("dotenv").config();
// console.log(process.env); //Working

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secrectAcessKey = process.env.SECRET_ACCESS_KEY;

//to config my s3 bucket credentails

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secrectAcessKey: secrectAcessKey,
  },
  region: bucketRegion,
});

module.exports.upload = async (req, res) => {
  const image = req.file;
  const imageBody = req.body;
  console.log(image, imageBody);

  //to send the data to s3 bucket have to putObject from @aws-sdk/client
  //So import it

  try {
    const params = {
      Bucket: bucketName,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);

    //to uplod this on S3
    const uplod = await s3.send(command);
  } catch (err) {
    res.send({ Name: err.name, Msh: err.message });
  }
};
