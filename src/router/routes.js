const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const s3Bucket = require("../controller/awsS3");

const { uploadFile } = require("../awsCred");

router.get("/test-me", (req, res) => {
  res.send({ msg: "Hi" });
});

router.post("/photo1/upload", upload.single("image"), s3Bucket.upload);

//Not Recommanded But Working
router.post("/photo/upload", upload.single("image"), async (req, res) => {
  await uploadFile(req.file);
  res.send({ msh: "Sucees" });
});

module.exports = router;
