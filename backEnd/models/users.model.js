import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  hashed_password: String,
  first_name: {
    type: String,
    default: ""
  },
  dob_day: {
    type: String,
    default: ""
  },
  dob_month: {
    type: String,
    default: ""
  },
  dob_year: {
    type: String,
    default: ""
  },
  show_gender: {
    type: Boolean,
    default: false
  },
  gender_identity: {
    type: String,
    default: "man"
  },
  gender_interest: {
    type: String,
    default: "woman"
  },
  url: {
    type: String,
    default: ""
  },
  about: {
    type: String,
    default: ""
  },
  matches: {
    type: [String],
    default: []
  }
})

const User = mongoose.model("User", userSchema)
export default User
