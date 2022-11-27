/* eslint import/no-cycle: 0 */

import { Sequelize, DataTypes, Model } from "sequelize";
import { DatabaseModel } from "../types/db";
import { ProgramModel } from "./program";

import { EXERCISE_DIFFICULTY } from "../utils/enums";

export class ExerciseModel extends DatabaseModel {
  id: number;
  difficulty: EXERCISE_DIFFICULTY;
  name: String;
  muscle: String;
  instructions: String;

  program: ProgramModel;
}

export default (sequelize: Sequelize) => {
  ExerciseModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      difficulty: {
        type: DataTypes.ENUM(...Object.values(EXERCISE_DIFFICULTY)),
      },
      name: {
        type: DataTypes.STRING(200),
      },
      muscle: {
        type: DataTypes.STRING(200),
      },
      instructions: {
        type: DataTypes.TEXT,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: "exercise",
    }
  );

  ExerciseModel.associate = (models) => {
    (ExerciseModel as any).belongsTo(models.Program, {
      foreignKey: {
        name: "programID",
        allowNull: false,
      },
    });
  };

  ExerciseModel.associate = (models) => {
    (ExerciseModel as any).hasMany(models.WorkoutExercise, {
      foreignKey: {
        name: "exerciseID",
        allowNull: false,
      },
      as: "translations",
    });
  };

  return ExerciseModel;
};
