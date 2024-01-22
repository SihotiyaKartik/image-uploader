const mongoose = require("mongoose")
// xcv
const imageSchema = new mongoose.Schema({
  data: Buffer,
  content: String
})

const ImageSchema = mongoose.model("Image", imageSchema)

module.exports = ImageSchema
