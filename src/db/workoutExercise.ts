/* eslint import/no-cycle: 0 */

import { Sequelize, DataTypes } from "sequelize";
import { DatabaseModel } from "../types/db";

export class WorkoutExerciseModel extends DatabaseModel {
  id: Number;
  reps: Number;
  series: Number;
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
      reps: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      series: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: "workoutExercise",
    }
  );

  WorkoutExerciseModel.associate = (models) => {
    (WorkoutExerciseModel as any).belongsTo(models.Day, {
      foreignKey: {
        name: "dayID",
        allowNull: false,
      },
    });
  };

  WorkoutExerciseModel.associate = (models) => {
    (WorkoutExerciseModel as any).belongsTo(models.Exercise, {
      foreignKey: {
        name: "exerciseID",
        allowNull: false,
      },
    });
  };

  return WorkoutExerciseModel;
};
