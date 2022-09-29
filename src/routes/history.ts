import { Router } from "express";
import { checkAuthenticated } from "../controllers/authController";
import {
  getAllExerciseRecords,
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
    .get("/:exerciseId", checkAuthenticated, getAllExerciseRecords)
    .post("/", checkAuthenticated, addCompletedExercise)
    .delete("/:id", checkAuthenticated, removeExerciseFromHistory);
