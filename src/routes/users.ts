import { Router, Request, Response, NextFunction } from 'express'
import { isAdmin } from "../auth/isAuth"
import { models } from '../db'

const router: Router = Router()

const User = models.User

export default () => {
    //API for admin
	router.get('/', isAdmin, async (_req: Request, res: Response, _next: NextFunction) => {
		const users = await User.findAll()
		return res.json({
			data: users,
			message: 'List of all users'
		})
	})

    router.get('/:id', isAdmin, async (_req: Request, res: Response, _next: NextFunction) => {
        const id = _req.params.id

		const user = await User.findOne({
            where: { id: id }
        })

		return res.json({
			data: user,
			message: `User with id: ${id}`
		})
	})

    router.put("/update/:id", isAdmin, (req: any, res: Response, _next: NextFunction) => {
		const id = req.params.id
		
		User.update(
			{
				name: req.body.name,
                surname: req.body.surname,
                nickName: req.body.nickName,
                age: req.body.age,
                role: req.body.role
			},
			{
				where: { id: id },
			}
    	)
	})
	return router
}
