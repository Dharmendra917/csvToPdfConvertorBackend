const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  hobby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hobbie",
  },
  name: String,
  age: String,
  class: String,
});

module.exports = mongoose.model("student", userModel);
