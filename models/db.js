const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Data base connect successfully");
  })
  .catch((error) => {
    console.log(error.message);
  });
