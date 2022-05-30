import { Router, Request, Response, NextFunction } from 'express'
const express = require("express")
const router: Router = Router()
const bcrypt = require("bcrypt")
const passport = require("passport")
const flash = require("express-flash")
const methodOverride = require('method-override')
import {checkAuthenticated, checkNotAuthenticated} from "./isAuth"
import initializePassport from './passport-config'
initializePassport(passport, getUserByEmail, getUserById)

router.use(express.urlencoded({ extended: false }))
router.use(flash())
router.use(passport.initialize())
router.use(passport.session())
router.use(methodOverride('_method'))

import { models } from '../db'
const User = models.User

router.get("/", checkAuthenticated, (req: any, res: any) => { 
    res.render("index.ejs", {name: req.session.passport.user})
})

router.get("/login", checkNotAuthenticated, (_req: Request, res: Response, _next: NextFunction) => {
    res.render("login.ejs")
})

router.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/auth",
    failureRedirect: "/auth/login",
    failureFlash: true
}))

router.get("/register", checkNotAuthenticated, (_req: Request, res: Response, _next: NextFunction) => {
    res.render("register.ejs")
})

router.post("/register", checkNotAuthenticated, async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        const hashPassword = await bcrypt.hash(_req.body.password, 10)

        User.create({
            name: _req.body.name,
            surname: _req.body.surname,
            nickName: _req.body.nickName,
            email: _req.body.email,
            password: hashPassword,
            age: _req.body.age,
            role: _req.body.role
        }).catch((err: any) => {
            if(err) {
                console.log(err)
                res.redirect("/auth/register")
            }
        })
        console.log("registracia prebehla uspesne")
        res.redirect("/auth/login")
    } catch {
        res.redirect("/auth/register")
    }
})

router.delete('/logout', (req: any, res: any) => {
    req.logOut()
    res.redirect('/auth/login')
})

async function getUserByEmail(email: any) {
    const user = await User.findOne({
        where: { email: email }
    })
    if(user !== null){
        return user
    } else return null
}

async function getUserById(id: any) {
    const user = await User.findOne({
        where: { id: id }
    })
    
    if(user !== null){
        return user
    } else return null
}

export default router