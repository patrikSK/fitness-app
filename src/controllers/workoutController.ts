import { Request, Response } from "express";
import { models } from "../db";

const { Workout, Day } = models;

const getWorkouts = async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.findAll();

    return res.status(200).json({
      success: true,
      data: workouts,
      message: "List of workouts",
    });
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};

const createWorkout = async (_req: Request, res: Response) => {
  try {
    const workout = await Workout.create({
      name: _req.body.name,
      days: _req.body.days,
    });

    for (let i = 0; i < _req.body.days; i++) {
      await Day.create({
        day: `day ${i}`,
        workoutID: workout.id,
      });
    }

    return res.status(200).json({
      success: true,
      workout: workout,
      message: "workout was successfully created",
    });
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};

const removeWorkout = async (_req: Request, res: Response) => {
  const id = _req.params.id;
  try {
    await Workout.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "workout was successfully removed",
    });
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};

const updateWorkout = async (_req: Request, res: Response) => {
  const id = _req.params.id;

  try {
    await Workout.update(
      {
        name: _req.body.name,
      },
      {
        where: { id: id },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Workout was successfully updated",
    });
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};

export { getWorkouts, createWorkout, removeWorkout, updateWorkout };
