import express from "express"
import connectDB from "./Database/db.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import jwt from "jsonwebtoken"
import cors from "cors"
import User from "./models/users.model.js"
const app = express()
app.use(cors())
app.use(express.json())
const port = 3000

app.post("/signup", async (req, res) => {
  const { email, password } = req.body
  const generateUserId = uuidv4()
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).send("User already registered")
    }

    const sanitizedEmail = email.toLowerCase()

    const data = {
      user_id: generateUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword
    }
    const newUser = new User(data)
    const insertedUser = await newUser.save()

    const newData = {
      user_id: insertedUser.user_id,
      email: insertedUser.email,
      hashed_password: insertedUser.hashed_password
    }

    const token = jwt.sign(newData, sanitizedEmail, {
      expiresIn: 60 * 24
    })

    res
      .status(201)
      .json({ token, userId: generateUserId, email: sanitizedEmail })
  } catch (error) {
    console.log(error.message)
  }
})

// Log in to the Database
app.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    const correctPassword = await bcrypt.compare(password, user.hashed_password)
    const newData = {
      user_id: user.user_id,
      email: user.email,
      hashed_password: user.hashed_password
    }

    if (user && correctPassword) {
      const token = jwt.sign(newData, email, {
        expiresIn: 60 * 24
      })
      res.status(201).json({ token, userId: user.user_id })
    }

    // res.status(400).json("Invalid Credentials")
  } catch (err) {
    console.log(err)
  }
})

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
