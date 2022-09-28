import { Router } from "express";
import { checkAuthenticated } from "../controllers/authController";
import {
  getCompletedExercises,
  getDates,
  addCompletedExercise,
  removeExerciseFromHistory,
  getExercisesFromOneDay,
} from "../controllers/historyController";

const router: Router = Router();

export default () =>
  router
    .get("/dates", checkAuthenticated, getDates)
    .get("/:date", checkAuthenticated, getExercisesFromOneDay)
    .get("/", checkAuthenticated, getCompletedExercises)
    .post("/", checkAuthenticated, addCompletedExercise)
    .delete("/:id", checkAuthenticated, removeExerciseFromHistory);
