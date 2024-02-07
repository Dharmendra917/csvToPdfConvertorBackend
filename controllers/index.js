const studentModel = require("../models/userModel.js");
const studentAdderss = require("../models/studentAddress.js");
const studentHobby = require("../models/studentHobby.js");
const csvtojson = require("csvtojson");
const multer = require("multer");
const userModel = require("../models/userModel");

exports.home = (req, res) => {
  res.status(200).json({ message: "this is home router" });
};

exports.create = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }
    const csvBuffer = req.file.buffer.toString("utf8");
    const jsonArrayObj = await csvtojson().fromString(csvBuffer);
    const student = await studentModel.insertMany(jsonArrayObj);

    // student id destructuring** from student model
    const studentId = student.map((elm) => {
      return elm._id;
    });

    // push student in  jsonArrayObj
    const studentWithId = jsonArrayObj.map((obj, index) => ({
      ...obj,
      student: studentId[index] || null,
    }));

    // save other infromation in AddersModel and HobbyModel
    const address = await studentAdderss.insertMany(studentWithId);
    const hobby = await studentHobby.insertMany(studentWithId);

    const addressId = address.map((elm) => {
      return elm._id;
    });
    const hobbyId = hobby.map((elm) => {
      return elm._id;
    });

    // update studentId, addressId and hobbyId return a copy in new arrayOfObjects
    const addressAndhobbyWithId = student.map((obj, index) => ({
      _id: obj._id,
      address: addressId[index],
      hobby: hobbyId[index],
    }));

    // it has check id with the help of filter and update or add information
    const updateData = addressAndhobbyWithId.map((data) => ({
      updateOne: {
        filter: { _id: data._id },
        update: {
          $set: {
            address: data.address,
            hobby: data.hobby,
          },
        },
      },
    }));

    // update studentModel using bulkWrite method and pass arrayOfObject inside it
    const result = await studentModel.bulkWrite(updateData);

    res.status(200).json({ message: "successfully uploaded", result });
  } catch (error) {
    res.json(error);
  }
};

exports.read = async (req, res) => {
  try {
    const studentInformation = await studentModel
      .find({})
      .populate("address")
      .populate({
        path: "hobby",
        populate: { path: "student" },
      }) // depopulate
      .exec();

    res.status(200).json({ message: " read successfull", studentInformation });
  } catch (error) {
    res.json(error.message);
  }
};
