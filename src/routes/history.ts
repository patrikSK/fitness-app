import { Router } from "express";
import { checkAuthenticated } from "../controllers/authController";
import {
  getAllRecords,
  getOneExerciseRecords,
  getDates,
  addCompletedExercise,
  removeExerciseFromHistory,
  getExercisesFromOneDay,
} from "../controllers/historyController";

const router: Router = Router();

export default () =>
  router
    .get("/allRecords", checkAuthenticated, getAllRecords)
    .get("/dates", checkAuthenticated, getDates)
    .get("/exercises/:date", checkAuthenticated, getExercisesFromOneDay)
    .get("/exercise/:exerciseId", checkAuthenticated, getOneExerciseRecords)
    .post("/", checkAuthenticated, addCompletedExercise)
    .delete("/:id", checkAuthenticated, removeExerciseFromHistory);
