import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import fs from "fs";
import path from "path";

import { models } from "../db";
const { User } = models;

const pathToKey: string = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY: string = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
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
