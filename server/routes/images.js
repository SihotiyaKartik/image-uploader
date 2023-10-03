const router = require("express").Router()
const multer = require("multer")
const ImageSchema = require("../models/imageschema")

const upload = multer()

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file selected" })
    }

    const Image = new ImageSchema({
      data: req.file.buffer,
      content: req.file.mimetype
    })

    await Image.save()
    return res.status(201).json({ message: "Image upload successfully" })
  } catch (error) {
    return res.status(500).json({ message: "Error while uploading image" })
  }
})

module.exports = router
