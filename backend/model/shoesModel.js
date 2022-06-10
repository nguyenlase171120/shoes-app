const mongoose = require("mongoose");

const shoesSchema = new mongoose.Schema(
  {
    shoesName: {
      type: String,
      required: true,
      minlength: 3,
      unique: true,
      maxlength: 100,
    },
    shoesPrice: {
      type: Number,
      required: true,
      minlength: 0,
    },
    shoesImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("shoesModels", shoesSchema);
