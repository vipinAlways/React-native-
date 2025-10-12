import express from "express";
import usermodel from "../models/user";

const route = express.Router();

route.get("/getAllUser", async (req, res) => {
  try {
   res.json({
      message: "All Users",}).status(200)
    ;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default route
