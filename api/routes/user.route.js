import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  signOut,
  test,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyUser, updateUser); //verifyToken is checked and if it is verified then it goes to the next function which is updateUser
router.get("/getusers", verifyUser, getUsers);
router.delete("/delete/:userId", verifyUser, deleteUser);
router.get("/:userId", getUser);
router.post("/signout", signOut);

export default router;
