const { Documentation } = require("../models/Sequelize");
const fs = require("fs");
const path = require("path");

const uploadDocumentation = async (req, res) => {
  try {
    const { kegiatan } = req.body;
    const file = req.file;
    const subfolder = file.mimetype.startsWith("image") ? "images" : "videos";
    const existingDocs = await Documentation.findAll({
      order: [["uploadedAt", "ASC"]],
    });

    if (existingDocs.length >= 3) {
      const oldest = existingDocs[0];
      if (oldest.fileUrl && fs.existsSync(oldest.fileUrl)) {
        fs.unlinkSync(oldest.fileUrl);
      }
      await oldest.destroy();
    }

    const doc = await Documentation.create({
      activityName: kegiatan,
      fileUrl: file
        ? `${req.protocol}://${req.get("host")}/uploads/${subfolder}/${
            file.filename
          }`
        : null,

      fileType: file
        ? file.mimetype.startsWith("image")
          ? "image"
          : "video"
        : null,
    });

    res.status(201).json({ message: "Upload successful", data: doc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllDocumentation = async (req, res) => {
  try {
    const docs = await Documentation.findAll({
      order: [["uploadedAt", "DESC"]],
    });
    res.json(docs);
  } catch (error) {
    console.error("Error fetching documentation:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadDocumentation, getAllDocumentation };
