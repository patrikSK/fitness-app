/* eslint import/no-cycle: 0 */
import { Sequelize, DataTypes } from "sequelize";
import { DatabaseModel } from "../types/db";
import { ExerciseModel } from "./exercise";
import { UserModel } from "./user";

export class HistoryModel extends DatabaseModel {
    id: Number;
    weight: Number;
    reps: Number;
    date: String;
    exerciseName: String;
    exercise: ExerciseModel;
    user: UserModel;
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
            date: {
                type: DataTypes.DATEONLY,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
            exerciseName: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            exerciseId: {
                type: DataTypes.INTEGER,
                references: {
                    model: ExerciseModel,
                    key: "id",
                },
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: UserModel,
                    key: "id",
                },
                allowNull: false,
            },
        },
        {
            paranoid: false,
            timestamps: false,
            sequelize,
            modelName: "history",
        }
    );

    ExerciseModel.belongsToMany(UserModel, {
        through: { model: HistoryModel, unique: false },
    });
    UserModel.belongsToMany(ExerciseModel, {
        through: { model: HistoryModel, unique: false },
    });

    return HistoryModel;
};
