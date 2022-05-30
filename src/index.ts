require("dotenv").config()
if(process.env.NODE_ENV !== "production") { require("dotenv").config() }

import http from 'http'
import express from 'express'
import * as bodyParser from 'body-parser'
import { sequelize } from './db'
import ProgramRouter from './routes/programs'
import ExerciseRouter from './routes/exercises'
import UsersRouter from "./routes/users"
import UserRouter from "./routes/user"
import auth from './auth/index'
const session = require('express-session')
const SessionStore = require('express-session-sequelize')(session.Store);
const passport = require('passport')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set("view engine", "ejs")
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
    },
    store: new SessionStore({
        db: sequelize,
        table: 'Session',
     }),
}))

require('./auth/passport-config')
app.use(passport.initialize())
app.use(passport.session())

app.use('/programs', ProgramRouter())
app.use('/exercises', ExerciseRouter())
app.use("/users", UsersRouter())
app.use("/user", UserRouter())
app.use("/auth", auth)


const httpServer = http.createServer(app)

sequelize.sync()

console.log('Sync database', 'postgresql://localhost:5432/fitness_app')


httpServer.listen(8000).on('listening', () => console.log(`Server started at port ${8000}`))

export default httpServer
