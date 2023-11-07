import { Request, Response } from "express";
import { models } from "../db";
import { Op } from "sequelize";

const { Exercise, BodyPart } = models;

const getExericses = async (_req: Request, res: Response) => {
  //converting queries (ParsedQs) to normal string, and than to number
  const page: number = parseInt(_req.query.page as string);
  const limit: number = parseInt(_req.query.limit as string);

  const bodyPartID: number = parseInt(_req.query.bodyPartID as string);
  const search = _req.query.search;

  // return data, base on included queries in url
  if (page && limit) {
    const startIndex: number = (page - 1) * limit;

    try {
      const exercises = await Exercise.findAll({
        include: [
          {
            model: BodyPart,
            as: "bodyPart",
          },
        ],
        offset: startIndex,
        limit: limit,
      });

      return res.status(200).json({
        success: true,
        data: exercises,
        message: "List of exercises",
      });
    } catch (err) {
      return res.json({ success: false, error: err });
    }
  } else if (bodyPartID) {
    try {
      const exercises = await Exercise.findAll({
        include: [
          {
            model: BodyPart,
            as: "bodyPart",
          },
        ],
        where: { bodyPartID: bodyPartID },
      });

      return res.status(200).json({
        success: true,
        data: exercises,
        message: "List of exercises",
      });
    } catch (err) {
      return res.json({ success: false, error: err });
    }
  } else if (search) {
    try {
      const exercises = await Exercise.findAll({
        include: [
          {
            model: BodyPart,
            as: "bodyPart",
          },
        ],
        where: {
          name: { [Op.iLike]: `%${search}%` },
        },
      });

      return res.status(200).json({
        success: true,
        data: exercises,
        message: "List of exercises",
      });
    } catch (err) {
      return res.json({ success: false, error: err });
    }
  } else {
    try {
      const exercises = await Exercise.findAll({
        include: [
          {
            model: BodyPart,
            as: "bodyPart",
          },
        ],
      });

      return res.status(200).json({
        success: true,
        data: exercises,
        message: "List of exercises",
      });
    } catch (err) {
      return res.json({ success: false, error: err });
    }
  }
};

const createExercise = async (_req: Request, res: Response) => {
  try {
    const exercise = await Exercise.create({
      difficulty: _req.body.difficulty,
      name: _req.body.name,
      instructions: _req.body.instructions,
      muscle: _req.body.muscle,
      bodyPartID: _req.body.bodyPartID,
    });

    return res.status(200).json({
      success: true,
      exercise: exercise,
      message: "exercise was successfully created",
    });
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};

const updateExercise = async (_req: Request, res: Response) => {
  const id = _req.params.id;

  try {
    await Exercise.update(
      {
        id: id,
        difficulty: _req.body.difficulty,
        name: _req.body.name,
        instructions: _req.body.instructions,
        muscle: _req.body.muscle,
        bodyPartID: _req.body.bodyPartID,
      },
      {
        where: { id: id },
      }
    );

    return res.status(200).json({
      success: true,
      message: "exercise was successfully updated",
    });
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};

const deleteExercise = async (_req: Request, res: Response) => {
  const id = _req.params.id;

  try {
    await Exercise.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Successfuly deleted exercise",
    });
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};

export { getExericses, createExercise, updateExercise, deleteExercise };
