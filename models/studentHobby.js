const mongoose = require("mongoose");

const studentHobby = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  hobby1: String,
  hobby2: String,
});

module.exports = mongoose.model("Hobbie", studentHobby);
