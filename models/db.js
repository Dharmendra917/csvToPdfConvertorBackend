const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/csv")
  .then(() => {
    console.log("Data base connect successfully");
  })
  .catch((error) => {
    console.log(error.message);
  });
