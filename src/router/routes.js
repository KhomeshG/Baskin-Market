const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/test-me", (req, res) => {
  res.send({ msg: "Hi" });
});

// //Uploading images------------>
// //
const uploadData = require("../controller/awsbucket/uploadData");
router.post("/photo/upload", upload.single("image"), uploadData.uploadData);

//Get Images from bucket--------->
const getDataFromBucket = require("../controller/awsbucket/getdata");
router.get("/photo", upload.single("image"), getDataFromBucket.getData);

//Get all the Imagefiles-------->
router.get("/photoAll", upload.single("image"), getDataFromBucket.getAllData);

//delete Images----->
router.delete("/photo", upload.single("image"), getDataFromBucket.deleteData);

//Rabbitmq route--->

// const publishToQueue = require("../controller/rabbitmq");
// const consummerToQueue = require("../controller/rabbitmq");

//Sending msg to rabbitmq-------->

// router.post("/msg", async (req, res, next) => {
//   let { queueName, payload } = req.body;
//   await publishToQueue.publishToQueue(queueName, payload);
//   res.statusCode = 200;
//   // res.data = { "message-sent": true };
//   res.send({ msg: true });
//   next();
// });

//Consummeing Data---->
// /Getingmsg from Rabbitmq-->

// router.get("/msg1", async (req, res, next) => {
//   await consummerToQueue.consummerToQueue();
//   res.send({ msg: true });
//   next();
// });

module.exports = router;
