import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import validator from "validator";

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    notes: [
      {
        title: { type: String, required: [true, "Please enter a title"] },
        note: { type: String, required: [true, "Please enter a title"] },
        color: { type: String },
      },
    ],
  },
  { collection: "user-data" }
);
User.plugin(uniqueValidator);

const UserModel = mongoose.model("UserModel", User);
export default UserModel;
