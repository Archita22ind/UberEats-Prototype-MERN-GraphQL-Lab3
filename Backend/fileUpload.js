const multer = require("multer");

const fileUpload = (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

  res.status(200).send({
    image: req.file.filename,
  });
};

module.exports = fileUpload;
