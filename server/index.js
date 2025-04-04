import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import AuthRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/notesRoutes.js";
dotenv.config();

// ENVenv modules
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

// middlewares
app.use(cors({ origin: CLIENT_URL, credentials: true })); //cors middleware
app.use(express.json()); //json middleeware
app.use(cookieParser()); //cookie middleware

// database and server connection
const startServer = async () => {
  try {
    await mongoose.connect(DB_URL, {
      //connecting the db
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit the process if DB fails to connect
  }
};

startServer();

app.use("/api-auth", AuthRoutes); //auth routes
app.use("/api-notes", noteRoutes); //notes routes
