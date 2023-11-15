/* eslint import/no-cycle: 0 */

import { Sequelize, DataTypes } from "sequelize";
import { DatabaseModel } from "../types/db";

export class BodyPartModel extends DatabaseModel {
  id: number;
  name: String;
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
        type: DataTypes.STRING(255),
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
    BodyPartModel.hasMany(models.Exercise, {
      foreignKey: {
        name: "bodyPartID",
        allowNull: false,
      },
    });
  };

  return BodyPartModel;
};
