const router = require("express").Router();
const multer = require("multer");
const ImageSchema = require("../models/imageschema");
const upload = multer();
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file selected",
        error: true
      });
    }
    const image = new ImageSchema({
      data: req.file.buffer,
      content: req.file.mimetype
    });
    const d = await image.save();
    return res.status(201).json({
      url: `http://localhost:3000/image/${d._id}`,
      message: "Image upload successfully",
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      error: true
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const image = await ImageSchema.findById(req.params.id);
    res.contentType(image.content);
    res.send(image.data);
  } catch (error) {
    console.log("Error occurred while getting image");
  }
});
module.exports = router;