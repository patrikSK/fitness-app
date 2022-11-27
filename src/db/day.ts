/* eslint import/no-cycle: 0 */

import { Sequelize, DataTypes } from "sequelize";
import { DatabaseModel } from "../types/db";

export class DayModel extends DatabaseModel {
  id: Number;
  name: String;
  day: String;
}

export default (sequelize: Sequelize) => {
  DayModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      day: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: "day",
    }
  );

  DayModel.associate = (models) => {
    (DayModel as any).belongsTo(models.Workout, {
      foreignKey: {
        name: "workoutID",
        allowNull: false,
      },
    });
  };

  DayModel.associate = (models) => {
    (DayModel as any).hasMany(models.WorkoutExercise, {
      foreignKey: {
        name: "dayID",
        allowNull: false,
      },
      as: "translations",
    });
  };

  return DayModel;
};
