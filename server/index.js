import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";

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

// enabling cookies
app.use(cookieParser());
// request body payload in json format
app.use(express.json());

//setting up route here
app.use("/api/auth", authRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}.`);
});

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log(`DB connection successful.`);
  })
  .catch((err) => {
    console.log(err.message);
  });
