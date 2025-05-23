const { Documentation } = require("../models/Sequelize");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const uploadDocumentation = async (req, res) => {
  try {
    const { kegiatan } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // Upload to Supabase Storage
    const fileExt = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = `uploads/${fileName}`;

    const { data, error } = await supabase.storage
      .from("documentation")
      .upload(filePath, fs.createReadStream(file.path), {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("documentation")
      .getPublicUrl(filePath);

    const fileType = file.mimetype.startsWith("image") ? "image" : "video";

    const doc = await Documentation.create({
      activityName: kegiatan,
      fileUrl: publicUrlData.publicUrl,
      fileType,
    });

    res.status(201).json({ message: "Upload successful", data: doc });
  } catch (error) {
    console.error("Upload error:", error.message);
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
