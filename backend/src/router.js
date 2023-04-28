const express = require("express");

const multer = require("multer");

const fs = require("fs");

// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require("uuid");

// We define the storage destination of our files
const upload = multer({ dest: "./public/uploads/" });

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.post("/api/avatar", upload.single("avatar"), (req, res) => {
  // We get the name of the file
  const { originalname } = req.file;

  // Get the name of the file
  const { filename } = req.file;

  fs.rename(
    `./public/uploads/${filename}`,
    `uploads/${uuidv4()}-${originalname}`,
    (err) => {
      if (err) throw err;
      res.send("File uploaded");
    }
  );
});
router.delete("/items/:id", itemControllers.destroy);

module.exports = router;
