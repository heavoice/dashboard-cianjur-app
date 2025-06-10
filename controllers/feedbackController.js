const { FeedbackForm } = require("../models/Sequelize");

const createFeedback = async (req, res) => {
  try {
    const { nama, pesan, topik, kepuasan } = req.body;

    // Validasi sederhana (opsional)
    if (
      !pesan ||
      pesan.trim() === "" ||
      !topik ||
      topik.trim() === "" ||
      !kepuasan ||
      kepuasan.trim() === ""
    ) {
      return res
        .status(400)
        .json({ message: "Pesan, Topik, dan Kepuasan tidak boleh kosong." });
    }

    const feedback = await FeedbackForm.create({
      nama: nama || null,
      pesan,
      topik,
      kepuasan,
    });

    return res.status(201).json({
      message: "Terima kasih atas feedback Anda!",
      data: feedback,
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan saat mengirim feedback.",
    });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await FeedbackForm.findAll();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data feedback." });
  }
};

module.exports = { createFeedback, getAllFeedback };
