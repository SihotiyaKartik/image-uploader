const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config()
const app = express()

const imagesRoute = require("./routes/images")

app.use("/image", imagesRoute)

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to mongoDB successfully")
  })
  .catch((error) => {
    console.log("Failed to connect to mongoDB", error)
  })

app.listen(3000, () => {
  console.log("server is running")
})
