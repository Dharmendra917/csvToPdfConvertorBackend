const mongoose = require("mongoose");

const studentAdderss = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  address_street: String,
  address_zipcode: String,
  address_city: String,
  address_state: String,
});

module.exports = mongoose.model("Address", studentAdderss);
