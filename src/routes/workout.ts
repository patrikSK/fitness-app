import { Router } from "express";
import { checkAuthenticated } from "../controllers/authController";
import {
  getWorkouts,
  createWorkout,
  removeWorkout,
  updateWorkout,
} from "../controllers/workoutController";

const router: Router = Router();

export default () =>
  router
    .get("/", getWorkouts)
    .post("/", checkAuthenticated, createWorkout)
    .put("/:id", checkAuthenticated, updateWorkout)
    .delete("/:id", checkAuthenticated, removeWorkout);
