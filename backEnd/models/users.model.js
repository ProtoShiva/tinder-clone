import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  user_id: String,
  email: String,
  hashed_password: String
})

const User = mongoose.model("User", userSchema)
export default User
