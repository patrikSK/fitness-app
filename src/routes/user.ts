import { Router } from "express";
import { checkAuthenticated, isAdmin } from "../controllers/authController";
import {
  getAllUsers,
  getUserData,
  updateUserData,
  getAllUserData,
  updateUserRole,
} from "../controllers/usersController";

const router: Router = Router();

export default () =>
  router
    .get("/user", checkAuthenticated, getUserData)
    .put("/user", checkAuthenticated, updateUserData)
    .get("/allUsers", getAllUsers)
    .get("/:id", checkAuthenticated, isAdmin, getAllUserData)
    .put("/:id", checkAuthenticated, isAdmin, updateUserRole);
