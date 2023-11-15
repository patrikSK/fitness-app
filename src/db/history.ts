/* eslint import/no-cycle: 0 */
import { Sequelize, DataTypes } from "sequelize";
import { DatabaseModel } from "../types/db";
import { ExerciseModel } from "./exercise";
import { UserModel } from "./user";

export class HistoryModel extends DatabaseModel {
  id: Number;
  weight: Number;
  reps: Number;

  exerciseID: ExerciseModel;
  userID: UserModel;
}

export default (sequelize: Sequelize) => {
  HistoryModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      reps: {
        type: DataTypes.INTEGER,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: "history",
    }
  );

  return HistoryModel;
};
