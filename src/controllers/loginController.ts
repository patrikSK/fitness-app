import { Request, Response } from "express";
import { validPassword, issueJWT } from "../utils/auth";
import { models } from "../db";

const { User } = models;

export default async (_req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: { email: _req.body.email },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "could not find user" });
    }

    const passwordIsValid = await validPassword(_req.body.password, user.password);

    if (!passwordIsValid) {
      return res
        .status(401)
        .json({ success: false, message: "you entered wrong password" });
    }

    if (user && passwordIsValid) {
      /*const tokenObject = issueJWT(user.id);
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
      );
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
      res.status(200).json({
        success: true,
        token: tokenObject.token,
        role: user.role,
        expiresIn: tokenObject.expires,
      });*/
      res.status(200).send("vsetko ide");
    }
  } catch (err) {
    res.status(400).json({ success: false, message: "sequelize error", error: err });
  }
};
