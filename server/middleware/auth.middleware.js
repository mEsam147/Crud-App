import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res.status(401).json({ message: "Unauthorized, no token found" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user)
      return res.status(401).json({ message: "Unauthorized, user not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (currentUser.role === "admin") {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};
