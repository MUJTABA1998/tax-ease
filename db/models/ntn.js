const mongoose = require("mongoose");

const NTNSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  email: {
    type: String,
  },
  fileData: {
    type: [String],
  },
});

module.exports = mongoose.model("NTN", NTNSchema);
