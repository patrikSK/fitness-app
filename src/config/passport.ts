const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');

import { models } from '../db'
const User = models.User

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
}

const strategy: any = new JwtStrategy(options, (payload: any, done: any) => {
    User.findOne({ where: {id: payload.sub} })
        .then((user: any) => {
            if(user) {
                return done(null, user)
            }
            else return done(null, false)
        })
        .catch((err: any) => done(err, null))
})

export default (passport: any) => {
    passport.use(strategy)
}
