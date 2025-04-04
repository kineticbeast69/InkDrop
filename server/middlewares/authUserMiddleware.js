import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const AuthUserMiddleware = (req, res, next) => {
  try {
    // Ensure cookies exist
    if (!req.cookies || !req.cookies.token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided." });
    }

    const token = req.cookies.token;

    // Verify JWT token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Invalid token." });
      }

      // Attach user info to request
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default AuthUserMiddleware;
