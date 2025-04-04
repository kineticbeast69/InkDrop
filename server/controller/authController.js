import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../model/userModel.js";
import dotenv from "dotenv";
// secret key
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const signupAuth = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    // checking the user exits or not
    const Userexist = await Users.findOne({ email: email });
    if (Userexist)
      return res.status(409).json({ message: "User already exists." });
    // saving the new user
    const salt = await bcrypt.genSalt(10); //generating salt
    const hashPassword = await bcrypt.hash(password, salt); //hashing the password
    const addUser = new Users({
      username,
      email,
      password: hashPassword,
    });
    await addUser.save();
    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
}; //signup page controller

const loginAuth = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userInfo = await Users.findOne({ email });
    if (!userInfo) {
      return res.status(401).json({ message: "Unauthorized User! Try again." });
    }

    // Checking the user password
    const matchPassword = await bcrypt.compare(password, userInfo.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid Password! Try again." });
    }

    // Generating JWT token
    const userObject = {
      username: userInfo.username,
      email: userInfo.email,
      id: userInfo._id,
    };
    const token = jwt.sign(userObject, SECRET_KEY, { expiresIn: "1h" });

    // Setting token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "Lax",
      maxAge: 3600000, // 1 hour
    });

    return res
      .status(200)
      .json({ message: "Login successful", id: userInfo._id });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}; //login page controller

const verifyUser = async (req, res) => {
  try {
    const user = req.user;
    return res.status(201).json({ message: "Valid user", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}; //verifying the auth user

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    return res.status(201).json({ message: "Logged out successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}; //logout the user controller

export { loginAuth, signupAuth, verifyUser, logoutUser };
