/* eslint import/no-cycle: 0 */

import { Sequelize, DataTypes } from "sequelize";
import { DatabaseModel } from "../types/db";
import { EXERCISE_DIFFICULTY } from "../utils/enums";
import { ExerciseModel } from "./exercise";

export class BodyPartModel extends DatabaseModel {
  id: number;
  difficulty: EXERCISE_DIFFICULTY;
  name: String;

  exercises: ExerciseModel[];
}

export default (sequelize: Sequelize) => {
  BodyPartModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(200),
      },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: "bodyPart",
    }
  );

  BodyPartModel.associate = (models) => {
    (BodyPartModel as any).hasMany(models.Exercise, {
      foreignKey: {
        name: "bodyPartID",
        allowNull: false,
      },
      as: "translations",
    });
  };

  return BodyPartModel;
};
