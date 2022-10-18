import { Request, Response } from "express";
import { models } from "../db";
import { getIdFromToken } from "../utils/auth";

const { User } = models;

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    /*
        {
            attributes: ["id", "nickName"],
        }
    */
    return res.status(200).json({
      success: true,
      data: users,
      message: "List of all users",
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

const getUserData = async (_req: Request, res: Response) => {
  const id = getIdFromToken(_req.headers.authorization);

  try {
    const user = await User.findOne({
      where: { id: id },
    });

    return res.status(200).json({
      success: true,
      data: {
        name: user.name,
        surname: user.surname,
        age: user.age,
        nickName: user.nickName,
      },
      message: `Users data with id: ${id}`,
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

const updateUserData = async (_req: Request, res: Response) => {
  const id = getIdFromToken(_req.headers.authorization);

  try {
    await User.update(
      {
        name: _req.body.name,
        surname: _req.body.surname,
        nickName: _req.body.nickName,
        age: _req.body.age,
      },
      {
        where: { id: id },
      }
    );

    return res.status(200).json({
      success: true,
      message: `User was successfully updated`,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

const getAllUserData = async (_req: Request, res: Response) => {
  const id = _req.params.id;

  try {
    const user = await User.findOne({
      where: { id: id },
    });

    return res.status(200).json({
      success: true,
      data: user,
      message: `User with id: ${id}`,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

const updateUserRole = async (_req: any, res: Response) => {
  const id = _req.params.id;

  try {
    const user = await User.update(
      {
        role: _req.body.role,
      },
      {
        where: { id: id },
      }
    );

    return res.status(200).json({
      success: true,
      data: user,
      message: `User role was successfully updated`,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

export { getAllUsers, getUserData, updateUserData, getAllUserData, updateUserRole };
