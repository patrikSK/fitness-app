/* eslint import/no-cycle: 0 */

import { Sequelize, DataTypes } from "sequelize";
import { DatabaseModel } from "../types/db";

export class WorkoutExerciseModel extends DatabaseModel {
  id: Number;
  repsInfo: String;

  dayID: Number;
  exerciseID: Number;
}

export default (sequelize: Sequelize) => {
  WorkoutExerciseModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      repsInfo: {
        type: DataTypes.TEXT,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: "workoutExercise",
    }
  );

  return WorkoutExerciseModel;
};
