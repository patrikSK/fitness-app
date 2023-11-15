/* eslint import/no-cycle: 0 */

import { Sequelize, DataTypes } from "sequelize";
import { DatabaseModel } from "../types/db";

export class DayModel extends DatabaseModel {
  id: Number;
  dayName: String;
  activityName: String;

  workoutID: Number;
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
      dayName: {
        type: DataTypes.STRING(255),
      },
      activityName: {
        type: DataTypes.STRING(255),
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
    DayModel.hasMany(models.WorkoutExercise, {
      foreignKey: {
        name: "dayID",
        allowNull: false,
      },
    });
  };

  return DayModel;
};
