import { Request, Response } from "express";
import { genPassword } from "../utils/auth";
import { models } from "../db";

const { User } = models;

export default async (_req: Request, res: Response) => {
  try {
    const hashPassword = await genPassword(_req.body.password);

    const user = await User.findOne({
      where: { email: _req.body.email },
    });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "user with that email is already exist",
      });
    }

    await User.create({
      name: _req.body.name,
      surname: _req.body.surname,
      nickName: _req.body.nickName,
      email: _req.body.email,
      password: hashPassword,
      age: _req.body.age,
      role: _req.body.role,
    });
    res.status(200).json({
      success: true,
      message: "registration was successfull",
    });
  } catch (err) {
    res.json({ success: false, error: err });
  }
};
