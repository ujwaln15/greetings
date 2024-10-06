import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactsRoutes from "./routes/ContactsRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessagesRoutes.js";
import gatheringRoutes from "./routes/GatheringRoutes.js";

// for setting env variables as in
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

// CORS is used for communication between the frontend and backend apps
app.use(
  cors({
    origin: [process.env.ORIGIN],
    // add supported methods
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    // for enabling cookies
    credentials: true,
  })
);

app.use("/uploads/dps", express.static("uploads/dps"));
app.use("/uploads/files", express.static("uploads/files"));

// enabling cookies
app.use(cookieParser());
// request body payload in json format
app.use(express.json());

//setting up route here
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/gathering", gatheringRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}.`);
});

setupSocket(server);

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log(`DB connection successful.`);
  })
  .catch((err) => {
    console.log(err.message);
  });
