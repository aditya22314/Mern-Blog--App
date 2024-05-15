import {
  create,
  deletepost,
  getposts,
  updatepost,
} from "../controllers/post.controller.js";
import { verifyUser } from "./../utils/verifyUser.js";
import express from "express";

const router = express.Router();

router.post("/create", verifyUser, create);
router.get("/getposts", getposts);
router.put("/updatepost/:postId/:userId", verifyUser, updatepost);
router.delete("/deleteposts/:postId/:userId", verifyUser, deletepost);

export default router;
