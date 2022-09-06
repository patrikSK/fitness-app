import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { models } from "../db";
const { User } = models;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PUB_KEY,
  algorithms: ["RS256"],
};

const strategy: any = new Strategy(options, (payload: any, done: any) => {
  User.findOne({ where: { id: payload.sub } })
    .then((user: any) => (user ? done(null, user) : done(null, false)))
    .catch((err: any) => done(err, null));
});

export default (passport: any) => {
  passport.use(strategy);
};
