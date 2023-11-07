import { Request, Response } from "express";
import { models } from "../db";

const { BodyPart } = models;

const getBodyParts = async (_req: Request, res: Response) => {
  try {
    const bodyParts = await BodyPart.findAll();
    return res.status(200).json({
      success: true,
      data: bodyParts,
      message: "List of bodyParts",
    });
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};

const createBodyPart = async (_req: Request, res: Response) => {
  try {
    const bodyPart = await BodyPart.create({
      name: _req.body.name,
    });

    return res.status(200).json({
      success: true,
      bodyPart: bodyPart,
      message: "bodyPart was successfully created",
    });
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};

const removeBodyPart = async (_req: Request, res: Response) => {
  const id = _req.params.id;
  try {
    await BodyPart.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "bodyPart was successfully removed",
    });
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};

export { getBodyParts, createBodyPart, removeBodyPart };
