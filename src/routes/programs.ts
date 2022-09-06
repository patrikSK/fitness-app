import {
    getPrograms,
    createProgram,
    removeProgram,
} from "../controllers/programsController";
import { isAdmin, checkAuthenticated } from "../controllers/authController";
import { Router } from "express";

const router: Router = Router();

//api for handle programs
export default () => {
    router
        .get("/", getPrograms)
        .post("/", checkAuthenticated, isAdmin, createProgram)
        .delete("/:id", checkAuthenticated, isAdmin, removeProgram);

    return router;
};
