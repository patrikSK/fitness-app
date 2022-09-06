import { Router } from "express";
import { isAdmin, checkAuthenticated } from "../controllers/authController";
import {
  getExericses,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../controllers/exercisesController";

const router: Router = Router();

export default () =>
  router
    .get("/", getExericses)
    .post("/", checkAuthenticated, isAdmin, createExercise)
    .put("/:id", checkAuthenticated, isAdmin, updateExercise)
    .delete("/:id", checkAuthenticated, isAdmin, deleteExercise);
