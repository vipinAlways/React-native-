import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import authRoutes from "./route/auth"
import GetAllUser from "./route/getApis"

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = Number(process.env.API_PORT) || 8000;


app.use(cors({
  origin: [
    'http://localhost:8081/', // Expo web
    'http://192.168.1.17:3000', // Replace with your IP
    'exp://192.168.1.100:19000', // Expo client
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());




mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error", err));

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Express + TypeScript + Nodemon running!");
});
app.get("/api", GetAllUser);
app.use("/api/auth", authRoutes); 
app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
