import express from "express";
import usermodel from "../models/user.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await usermodel.findOne({ email });

  if (!user) return res.status(400).send("Invalid username or password.");

  
  const validPassword = await bcrypt.compare(password,user.password);

  if (!validPassword)
    return res.status(400).send("Invalid username or password.");

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET ?? "");

  res.send({ token });
});

router.post("/register", async (req, res) => {
  try {
    const { username, password,email } = req.body;

    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new usermodel({
      username,
      password: hashedPassword,
      email
    });

    const savedUser = await user.save();
    res.json({
      message: "User registered successfully",
      userId: savedUser._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
