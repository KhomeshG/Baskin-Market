const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageLoaction: { type: String, required: true },
  imageText: { type: String },
  bucketName: { type: String },
  objectName: { type: String },
});

module.exports = mongoose.model("image", imageSchema);
