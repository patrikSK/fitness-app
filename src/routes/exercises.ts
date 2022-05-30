import { Router, Request, Response, NextFunction } from 'express'
import { models } from '../db'
/*import { isAdmin } from "../auth/isAuth"*/

const router: Router = Router()

const {
	Exercise,
	Program
} = models

export default () => {
	router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
		const exercises = await Exercise.findAll({
			include: [{
				model: Program,
				as: 'program'
			}]
		})

		return res.json({
			data: exercises,
			message: 'List of exercises'
		})
	})

	router.post("/add", async (_req: Request, res: Response, _next: NextFunction) => {
		await Exercise.create({
            difficulty: _req.body.difficulty,
            name: _req.body.name,
			programID: _req.body.programID
        })
	})

	router.put("/update/:id", async (_req: Request, res: Response, _next: NextFunction) => {
		const id = _req.params.id

		Exercise.update(
			{
				id: id,
				difficulty: _req.body.difficulty,
				name: _req.body.name,
				programID: _req.body.programID
			},
			{
				where: { id: id },
			}
    	)
	})

	router.delete("/remove/:id", async (_req: Request, res: Response, _next: NextFunction) => {
		try {
            const id = _req.params.id

            await Exercise.destroy({
                where: {
                    id: id
                }
            })

            res.status(200).send("Successfuly deleted exercise")
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: "There was an error deleting this exercise"
            })
        }
	})

	router.post("/addToProgram/:id", async (_req: Request, res: Response, _next: NextFunction) => {
		const id = _req.params.id

		await Exercise.create({
            difficulty: _req.body.difficulty,
            name: _req.body.name,
			programID: id
        })
	})

	router.delete("/removeFromProgram/:idProgram/:idExercise", async (_req: Request, res: Response, _next: NextFunction) => {
		try {
            const idProgram = _req.params.idProgram
			const idExercise = _req.params.idExercise

            await Exercise.destroy({
                where: {
                    programID: idProgram,
					id: idExercise
                }
            })

            res.status(200).send("Successfuly removed exercise from program")
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: "There was an error deleting this exercise from program"
            })
        }
	})

	return router
}
