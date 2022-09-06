import { Router } from "express";
import { isAdmin, checkAuthenticated } from "../controllers/authController";
import {
    getExericses,
    createExercise,
    updateExercise,
    deleteExercise,
} from "../controllers/exercisesController";

const router: Router = Router();

//API for handle exercises
export default () => {
    router
        .get("/", getExericses)
        .post("/", checkAuthenticated, isAdmin, createExercise)
        .put("/:id", checkAuthenticated, isAdmin, updateExercise)
        .delete("/:id", checkAuthenticated, isAdmin, deleteExercise);

    // remove exercise from program
    /* router.delete(
        "/:idExercise/:idProgram",
        checkAuthenticated,
        isAdmin,
        async (_req: Request, res: Response) => {
            try {
                const idProgram = _req.params.idProgram;
                const idExercise = _req.params.idExercise;

                await Exercise.destroy({
                    where: {
                        programID: idProgram,
                        id: idExercise,
                    },
                });

                res.status(200).send(
                    "Successfuly removed exercise from program"
                );
            } catch (err) {
                console.log(err);
                res.status(500).send({
                    error: "There was an error deleting this exercise from program",
                });
            }
        }
    );*/

    return router;
};
