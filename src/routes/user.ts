import { Router, Request, Response, NextFunction } from 'express'
import { models } from '../db'
import { checkAuthenticated } from '../auth/isAuth'
const router: Router = Router()
const User = models.User

export default () => {
    //API for User
	router.get('/allUsers', checkAuthenticated, async (_req: Request, res: Response, _next: NextFunction) => {
		const users = await User.findAll({
			attributes: ['id', 'nickName']
		})
		console.log(users)
		return res.json({
			data: {
                users
            },
			message: 'List of all users'
		})
	})

    router.get(`/profile/:id`, checkAuthenticated, async (req: any, res: Response, _next: NextFunction) => {
        const id = req.params.id
		
		if(id === req.session.passport.user){
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
		} else {
			res.status(401).json({message: "this is not your profile"})
		}
	})

    router.put("/update/:id", checkAuthenticated, async (req: any, res: Response, _next: NextFunction) => {
		const id = req.params.id

		if(id === req.session.passport.user){
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
		}
	})
    
	return router
}
