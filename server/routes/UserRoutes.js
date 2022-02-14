import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel.js";
import { body, validationResult } from "express-validator";

const routes = express.Router();

// Register form validation that will send a error

routes.post(
  "/register",
  body("username")
    .isLength({ min: 4, max: 10 })
    .withMessage("Username must have 4 to 10 characters")
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("Remove white spaces or special characters")
    .custom((value) => {
      return UserModel.findOne({ username: value }).then((user) => {
        if (user) return Promise.reject("Username already in use");
      });
    }),

  body("email")
    .isEmail()
    .withMessage("Invalid Email format")
    .custom((value) => {
      return UserModel.findOne({ email: value }).then((user) => {
        if (user) return Promise.reject("Email already being used");
      });
    }),
    
  body("password")
    .isLength({ min: 4, max: 10 })
    .withMessage("Password must have  4 to 10 characters")
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("Remove white spaces or special characters"),

  body('repeat')
    .custom((value, {req}) => {
       if(value !== req.body.password){
        throw new Error('Password does not match');
      }else if(!req.body.password) throw new Error('Password does not match');
      return true;
    }), 

  async (req, res) => {
    const { username, email, password, repeat } = req.body;
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        
        const userError = errors.array().find((i) => i.param === "username");
        const emailError = errors.array().find((i) => i.param === "email");
        const passwordError = errors.array().find((i) => i.param === "password");
        const repeatError = errors.array().find((i) => i.param === "repeat");

        return res.send({ success: false, errors: { userError, emailError, passwordError, repeatError } });
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const User = await UserModel.create({
        username,
        email,
        password: hash,
      });
      res.send({ message: true, errors: false });
    } catch (err) {
      res.status(500).send("Error");
    }
  }
);

// Login form validation in order to find the user in our DB

routes.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const checkUser = await UserModel.findOne({ username });

    if (!checkUser) return res.send({ userError: "Invalid username" });

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    const token = jwt.sign({ username, password, id: checkUser._id }, "password123");
    if (checkPassword) res.json({ auth: token, userError: false, passwordError: false });
    else res.json({ auth: false, passwordError: "Invalid password" });
  } catch (err) {
    res.status(500).send("An error ocurred");
  }
});

// Will send account (account information and notes) to the user area component

routes.get("/getaccount", async (req, res) => {
  const token = req.headers.authorization;
  console.log("rtes");

  try {
    const decoded = jwt.verify(token, "password123");
    const userAccount = await UserModel.findOne({ username: decoded.username });
    if (userAccount) res.send(userAccount);
    else res.status(500).send("Error tryng to connect with Account");
  } catch (err) {
    res.status(500).send("Error tryng to connect with account");
  }
});

routes.delete("/deleteaccount/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await UserModel.findByIdAndRemove(id);

    if (deleted) return res.send(deleted);
    else return res.status(500).send("Error");
  } catch (err) {
    res.status(500).send("An error ocurred");
  }
});

export default routes;
