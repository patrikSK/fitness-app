/* eslint import/no-cycle: 0 */

import { Sequelize, DataTypes } from "sequelize";
import { DatabaseModel } from "../types/db";
import { BodyPartModel } from "./bodyPart";
import { UserModel } from "./user";

import { EXERCISE_DIFFICULTY } from "../utils/enums";

export class ExerciseModel extends DatabaseModel {
  id: number;
  difficulty: EXERCISE_DIFFICULTY;
  name: String;
  muscle: String;
  instructions: String;
  image: Blob;

  createdByUser: UserModel;
  bodyPartID: BodyPartModel;
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
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      muscle: {
        type: DataTypes.STRING(255),
      },
      instructions: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.BLOB,
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
    ExerciseModel.hasMany(models.WorkoutExercise, {
      foreignKey: {
        name: "exerciseID",
        allowNull: false,
      },
    });
    ExerciseModel.hasMany(models.History, {
      foreignKey: {
        name: "exerciseID",
        allowNull: false,
      },
    });
  };

  return ExerciseModel;
};
