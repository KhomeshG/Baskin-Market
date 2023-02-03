const { uploadFile } = require("../../awsCred");
module.exports.uploadData = async (req, res, next) => {
  await uploadFile(req.file);
  res.status(200).send({ status: true });
  next();
};
