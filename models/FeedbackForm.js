module.exports = (sequelize, DataTypes) => {
  const FeedbackForm = sequelize.define("FeedbackForm", {
    nama: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pesan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    topik: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kepuasan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return FeedbackForm;
};
