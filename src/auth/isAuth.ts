import { models } from '../db'
const User = models.User

function checkAuthenticated(req: any, res: any, next: any) {
    if (req.isAuthenticated()) {
      next()
    } else {
        res.redirect('/auth/login')
    }
}

function checkNotAuthenticated(req: any, res: any, next: any) {
    if (req.isAuthenticated()) {
      return res.redirect('/auth')
    }
    next()
}

async function isAdmin(req: any, res: any, next: any) {
    const user = await User.findOne({
        where: { id: req.session.passport.user}
    })
    console.log(user)
    if(req.isAuthenticated() && user.role == "ADMIN") {
        next()
    } else {
        res.status(401).json({message: "you are not admin"})
        //res.redirect('/auth')
    } 
}

export {
    checkAuthenticated,
    checkNotAuthenticated,
    isAdmin
}