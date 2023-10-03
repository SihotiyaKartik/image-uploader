const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")

dotenv.config()
const app = express()

const imagesRoute = require("./routes/images")

app.use(express.json())
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "100.20.92.101",
      "44.225.181.72",
      "44.227.217.144"
    ]
  })
)
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
