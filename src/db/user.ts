/* eslint import/no-cycle: 0 */

import { Sequelize, DataTypes } from "sequelize";
import { DatabaseModel } from "../types/db";
import { ROLE } from "../utils/enums";

export class UserModel extends DatabaseModel {
  id: Number;
  nickName: String;
  email: String;
  password: String;
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
      nickName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(255),
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

  UserModel.associate = (models) => {
    UserModel.hasMany(models.Exercise, {
      foreignKey: {
        name: "createdByUser",
        allowNull: false,
      },
    });

    UserModel.hasMany(models.Workout, {
      foreignKey: {
        name: "createdByUser",
        allowNull: false,
      },
    });

    UserModel.hasMany(models.History, {
      foreignKey: {
        name: "userID",
        allowNull: false,
      },
    });
  };

  return UserModel;
};
