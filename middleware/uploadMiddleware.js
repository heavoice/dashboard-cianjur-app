const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");
    const folder = isImage ? "documentation/images" : "documentation/videos";

    return {
      folder: folder,
      resource_type: "auto",
      allowed_formats: ["jpg", "png", "jpeg", "mp4", "mov", "avi", "mkv"],
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

const fileFilter = (req, file, cb) => {
  console.log("Uploaded file mimetype:", file.mimetype);
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
  ];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only images and videos are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
