/* eslint import/no-cycle: 0 */

import { Sequelize, DataTypes } from "sequelize";
import { DatabaseModel } from "../types/db";

export class WorkoutModel extends DatabaseModel {
  id: Number;
  name: String;
  days: Number;
}

export default (sequelize: Sequelize) => {
  WorkoutModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      days: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: "workout",
    }
  );

  WorkoutModel.associate = (models) => {
    (WorkoutModel as any).hasMany(models.Day, {
      foreignKey: {
        name: "workoutID",
        allowNull: false,
      },
      as: "translations",
    });
  };

  return WorkoutModel;
};
