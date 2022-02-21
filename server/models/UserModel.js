import mongoose from "mongoose";

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
        title: { type: String },
        note: { type: String },
        color: { type: String },
      },
    ],
  },
  { collection: "user-data" }
);

const UserModel = mongoose.model("UserModel", User);
export default UserModel;
