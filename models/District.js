const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('District', DistrictSchema);
