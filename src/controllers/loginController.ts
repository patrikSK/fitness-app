import { Request, Response } from "express";
import { validPassword, issueJWT } from "../utils/auth";
import { models } from "../db";

const { User } = models;

export default async (_req: Request, res: Response) => {
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

  const tokenObject = issueJWT(user.id);
  return res.status(200).json({
    success: true,
    token: tokenObject.token,
    role: user.role,
    expiresIn: tokenObject.expires,
  });
};
