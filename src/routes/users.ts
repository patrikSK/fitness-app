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

    router.put("/update/:id", isAdmin, (_req: Request, res: Response, _next: NextFunction) => {
		const id = _req.params.id
		console.log(_req.session)
		User.update(
			{
				name: _req.body.name,
                surname: _req.body.surname,
                nickName: _req.body.nickName,
                age: _req.body.age,
                role: _req.body.role
			},
			{
				where: { id: id },
			}
    	)
	})
	return router
}
