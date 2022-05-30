import {
	Router,
	Request,
	Response,
	NextFunction
} from 'express'

import { models } from '../db'

const router: Router = Router()

const User = models.User

export default () => {
    //API for User
	router.get('/allUsers', async (_req: Request, res: Response, _next: NextFunction) => {
		const users = await User.findAll()
		console.log(_req.session)
		return res.json({
			data: {
                id: users.id,
                nickName: users.nickName
            },
			message: 'List of all users'
		})
		
	})

    router.get('/profile/:id', async (_req: Request, res: Response, _next: NextFunction) => {
        const id = _req.params.id

		const user = await User.findOne({
            where: { id: id }
        })

		return res.json({
			data: {
                name: user.name,
                surname: user.surname,
                age: user.age,
                nickName: user.nickName
            },
			message: `User with id: ${id}`
		})
	})

    router.put("/update/:id", async (_req: Request, res: Response, _next: NextFunction) => {
		const id = _req.params.id

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
