import express from "express";
import mongoose from "mongoose";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.route.js";
import cookieParser from "cookie-parser";
import commentRoutes from "./routes/comment.route.js";
import path from "path";
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => {
    console.log(err);
  });
app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "  Something went wrong";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
