/* eslint import/no-cycle: 0 */

import { Sequelize, DataTypes } from "sequelize";
import { DatabaseModel } from "../types/db";
import { ROLE } from "../utils/enums";

export class UserModel extends DatabaseModel {
    id: Number;
    name: String;
    surname: String;
    nickName: String;
    email: String;
    password: String;
    age: Number;
    role: ROLE;
}

export default (sequelize: Sequelize) => {
    UserModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            surname: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            nickName: {
                type: DataTypes.STRING(200),
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING(250),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING(200),
                allowNull: false,
                validate: {
                    isIn: [[ROLE.ADMIN, ROLE.USER]],
                },
            },
        },
        {
            paranoid: true,
            timestamps: true,
            sequelize,
            modelName: "user",
        }
    );

    return UserModel;
};
