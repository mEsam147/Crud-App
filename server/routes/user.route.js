import express from "express";
import {
  login,
  logout,
  register,
  getCurrentUserProfile,
} from "../controllers/user.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get('/me' , protectedRoute , getCurrentUserProfile)

export default router;
