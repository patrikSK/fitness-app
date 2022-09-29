import { Request, Response } from "express";
import { models } from "../db";
import { getIdFromToken } from "../utils/auth";
import sequelize from "sequelize";

const { History } = models;

const getOneExerciseRecords = async (_req: Request, res: Response) => {
  const id = getIdFromToken(_req.headers.authorization);
  const exerciseId = _req.params.exerciseId;
  try {
    const records = await History.findAll({
      where: { userId: id, exerciseId: exerciseId },
    });

    return res.status(200).json({
      success: true,
      data: {
        exerciseRecords: records,
      },
      message: "List of all records of one exercise",
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

const getDates = async (_req: Request, res: Response) => {
  const id = getIdFromToken(_req.headers.authorization);

  try {
    const dates = await History.findAll({
      attributes: ["date"],
      group: "date",
      where: { userId: id },
    });

    return res.status(200).json({
      success: true,
      data: {
        dates: dates,
      },
      message: "List of all dates, when all exercises were performed",
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

const getExercisesFromOneDay = async (_req: Request, res: Response) => {
  const id = getIdFromToken(_req.headers.authorization);
  const date = _req.params.date;

  try {
    const exercises = await History.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("exerciseId")), "exerciseId"],
        "exerciseName",
      ],
      where: { userId: id, date: date },
    });

    return res.status(200).json({
      success: true,
      data: {
        exercises: exercises,
      },
      message: "List of all exercises, performed id one specific day",
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

const addCompletedExercise = async (_req: Request, res: Response) => {
  const id = getIdFromToken(_req.headers.authorization);

  try {
    const exercise = await History.create({
      weight: _req.body.weight,
      reps: _req.body.reps,
      exerciseName: _req.body.exerciseName,
      exerciseId: _req.body.exerciseId,
      userId: id,
    });
    return res.status(201).json({
      success: true,
      exercise: exercise,
      message: "exercise was succesfully saved to history",
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

const removeExerciseFromHistory = async (_req: Request, res: Response) => {
  const id = _req.params.id;

  try {
    await History.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Exercise was successfully removed from history",
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

export {
  getOneExerciseRecords,
  addCompletedExercise,
  removeExerciseFromHistory,
  getDates,
  getExercisesFromOneDay,
};
