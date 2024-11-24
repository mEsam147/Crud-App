import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/tokenAndCookie.js";
import validator from "validator";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!validator.isEmail(email) || !validator.isLength(password, { min: 6 })) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);
    res.status(201).json({
      message: "User created successfully",
      user: {
        ...newUser._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!validator.isEmail(email) || !validator.isLength(password, { min: 6 })) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  try {
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await isUserExist.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    generateTokenAndSetCookie(isUserExist._id, res);
    const user = await User.findById(isUserExist._id).select("-password");
    res.status(200).json({ message: "Login successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCurrentUserProfile = async (req, res) => {
  try {
    const currentUser = req.user;
    res.json(currentUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
