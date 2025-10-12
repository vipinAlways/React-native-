import mongoose, { Schema, Mongoose } from "mongoose";
import { User } from "../types/schematypes";

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "please use a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});



const usermodel = (mongoose.models.User as mongoose.Model<User>)||mongoose.model<User>("User" , userSchema)

export default usermodel
