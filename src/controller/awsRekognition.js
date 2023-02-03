const aws = require("aws-sdk");

const deleteData = require("../controller/awsbucket/getdata");

const rekognition = new aws.Rekognition({
  region: "us-east-1", // like us-east-1
  // accessKeyId: accessKey,
  // secrectAcessKey: secrectAcessKey,
});

module.exports.rekognitionData = async (data, res) => {
  try {
    await rekognition.detectModerationLabels(
      {
        Image: {
          S3Object: {
            Bucket: data[0]["bucketName"],
            Name: data[1]["objectName"],
          },
        },
      },
      (err, data) => {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log(data);
        }
      }
    );
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Server Error", status: false, err: err.message });
  }
  //bcz of crendentails This Part is not Done
  // if (expliciteContent) {
  //   deleteData.deleteData(data[0]["bucketName"], data[1]["objectName"]);
  // }
};
