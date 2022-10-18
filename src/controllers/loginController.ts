import { Request, Response } from "express";
import { validPassword, issueJWT } from "../utils/auth";
import { models } from "../db";

const { User } = models;

export default async (_req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: { email: _req.body.email },
    });

    const passwordIsValid = await validPassword(_req.body.password, user.password);

    if (!user) {
      return res.status(401).json({ success: false, message: "could not find user" });
    } else if (!passwordIsValid) {
      return res
        .status(401)
        .json({ success: false, message: "you entered wrong password" });
    } else {
      const tokenObject = await issueJWT(user.id);
      console.log(tokenObject);
      return res.status(200).json({
        success: true,
        token: tokenObject.token,
        role: user.role,
        expiresIn: tokenObject.expires,
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: "sequelize error", error: err });
  }
};
