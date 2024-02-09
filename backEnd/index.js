import express from "express"
import connectDB from "./Database/db.js"
import mongoose from "mongoose"
const app = express()
const port = 3000

app.get("/", (req, res) => {
  res.json("Hello world")
})
const User = mongoose.model("User", {}, "users")
app.get("/users", async (req, res) => {
  try {
    const returnedUsers = await User.find({})
    res.json(returnedUsers)
  } catch (error) {
    console.log(error.message)
  }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
