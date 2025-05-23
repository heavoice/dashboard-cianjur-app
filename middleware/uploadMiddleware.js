const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "/tmp",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedImageExt = [".png", ".jpg", ".jpeg"];
  const allowedVideoExt = [".mp4", ".mov", ".avi", ".mkv"];

  const allowedImageMimes = ["image/png", "image/jpg", "image/jpeg"];
  const allowedVideoMimes = [
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
  ];

  if (
    ![...allowedImageExt, ...allowedVideoExt].includes(ext) ||
    ![...allowedImageMimes, ...allowedVideoMimes].includes(file.mimetype)
  ) {
    return cb(new Error("Only images and videos are allowed"), false);
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
