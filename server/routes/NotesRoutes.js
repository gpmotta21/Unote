import express from "express";
import UserModel from "../models/UserModel.js";
import { body, validationResult } from "express-validator";

const Notes = express.Router();

Notes.patch(
  "/createnote/:id",
  body("title").isLength({ min: 1, max: 15 }),
  body("note").isLength({ min: 1, max: 200 }),

  async (req, res) => {
    const { title, note, color } = req.body;
    const { id } = req.params;
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        res.send({ noteError: true });
      } else {
        UserModel.findOneAndUpdate(
          { _id: id },
          {
            $push: {
              notes: { title: title, note: note, color: color },
            },
          },
          { new: true },
          (err, doc) => {
            if (err) return res.status(500).send("err");
            else if (!doc) return res.status(500).send("Error");
            else return res.send(doc);
          }
        );
      }
    } catch (err) {
      res.status(500).send("Error");
    }
  }
);

Notes.patch(
  "/editnote/:noteId",
  body("title").isLength({ max: 15 }),
  body("note").isLength({ max: 200 }),

  async (req, res) => {
    const { noteId } = req.params;
    const { title, color, note } = req.body;
    const errors = validationResult(req);

    const updateQuery = {};
    if (title) updateQuery.title = title;

    if (note) updateQuery.note = note;

    if (color) updateQuery.color = color;

    try {
      if (!errors.isEmpty()) {
        res.send({ noteError: true });
      } else {
        UserModel.findOneAndUpdate(
          { "notes._id": noteId },
          {
            $set: {
              "notes.$.title": updateQuery.title,
              "notes.$.note": updateQuery.note,
              "notes.$.color": updateQuery.color,
            },
          },

          { new: true },
          (err, doc) => {
            if (err) return res.status(500).send("An error ocurred");
            else if (!doc) return res.status(500).send("An error ocurred");
            else return res.send(doc);
          }
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  }
);

Notes.patch("/delete/:id/:note", async (req, res) => {
  const { id, note } = req.params;
  try {
    UserModel.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          notes: { _id: note },
        },
      },
      { new: true },
      (err, doc) => {
        if (err) return res.status(500).send("Error");
        else if (!doc) return res.status(500).send("Error");
        else return res.send(doc);
      }
    );
  } catch (err) {
    res.status(500).send("Error tryng to find account");
  }
});

export default Notes;
