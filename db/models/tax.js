const mongoose = require("mongoose");

const TaxSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  cnic: {
    type: String,
  },
  nationality: {
    type: String,
  },
  residence: {
    type: String,
  },
  occupation: {
    type: String,
  },
  ntnNumber: {
    type: String,
  },
  ntnUsername: {
    type: String,
  },
  ntnPin: {
    type: String,
  },
  ntnPassword: {
    type: String,
  },
  incomeType: {
    type: [String],
  },
  docs: {
    type: [String],
  },
  taxesData: {
    type: [String],
  },
  bankState: {
    type: String,
  },
  amount: {
    type: String,
  },
  jewllery: {
    type: String,
  },
  vehicles: {
    type: String,
  },
  property: {
    type: String,
  },
});

module.exports = mongoose.model("Tax", TaxSchema);
