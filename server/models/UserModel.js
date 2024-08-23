import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required."],
  },
  theme: {
    type: Number,
    required: false,
  },
  profileComplete: {
    type: Boolean,
    default: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  dp: {
    type: String,
    required: false,
  },
});

// middleware that runs before the data is committed to the DB
userSchema.pre("save", async function (next) {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

const User = mongoose.model("users", userSchema);
export default User;
