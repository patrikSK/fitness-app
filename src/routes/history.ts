import { Router } from "express";
import { checkAuthenticated } from "../controllers/authController";
import {
    getCompletedExercises,
    addCompletedExercise,
    removeExerciseFromHistory,
} from "../controllers/historyController";

const router: Router = Router();

//API for tracking completed exercises
export default () => {
    router
        .get("/", checkAuthenticated, getCompletedExercises)
        .post("/", checkAuthenticated, addCompletedExercise)
        .delete("/:id", checkAuthenticated, removeExerciseFromHistory);

    return router;
};
