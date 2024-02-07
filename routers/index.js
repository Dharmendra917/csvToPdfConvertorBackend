const express = require("express");
const { home, create, read } = require("../controllers");
const multer = require("multer");
const router = express.Router();

router.get("/", home);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create", upload.single("csvFile"), create);

router.get("/read", read);

module.exports = router;
