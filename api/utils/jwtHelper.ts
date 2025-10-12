import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "YOUR_SECRET_KEY"; // better keep in .env

// Define user type
interface User {
  _id: string;
  email: string;
}

export const generateToken = (user: User): string => {
  return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, SECRET_KEY);
};
