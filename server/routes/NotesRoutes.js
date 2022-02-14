import express from "express";
import UserModel from "../models/UserModel.js";

const Notes = express.Router();

Notes.patch("/createnote/:id", async (req, res) => {
  const { title, note, color } = req.body;
  const { id } = req.params;

  try {
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
        else return res.send(doc.notes);
      }
    );
  } catch (err) {
    res.status(500).send("Error");
  }
});

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
        else return res.send(doc.notes);
      }
    );
  } catch (err) {
    res.status(500).send("Error tryng to find account");
  }
});

Notes.patch("/editnote/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const { title, color, note } = req.body;

  const updateQuery = {};
  if (title) updateQuery.title = title;

  if (note) updateQuery.note = note;

  if (color) updateQuery.color = color;

  try {
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
        else return res.send(doc.notes);
      }
    );
  } catch (err) {
    console.log(err.message);
  }
});

export default Notes;
