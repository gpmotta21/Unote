import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes/UserRoutes.js";
import Notes from "./routes/NotesRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", routes, Notes);

app.get("/", (req, res) => {
  res.send("Hello to my project!!");
});

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

app.listen(PORT, () => console.log("Server is running"));
