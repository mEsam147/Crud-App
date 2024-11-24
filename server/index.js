import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoute from "./routes/user.route.js";
import crudRoute from "./routes/crud.route.js";
import { isAdmin, protectedRoute } from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
  })
);
const port = process.env.PORT || 8000;

app.use("/api/user", userRoute);
app.use("/api/crud", protectedRoute, isAdmin, crudRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
