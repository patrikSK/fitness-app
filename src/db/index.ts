/* eslint import/no-cycle: 0 */

import path from "path";
import fs from "fs";
import { Sequelize } from "sequelize";

import defineExercise from "./exercise";
import defineProgram from "./program";
import defineUser from "./user";
import defineHistory from "./history";

const uri =
  process.env.NODE_ENV === "development"
    ? process.env.DATABASE_URL
    : process.env.DATABASE_INTERNAL_URI;

const sequelize: Sequelize = new Sequelize(uri, {
  port: 5432,
  logging: false,
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {},
});

sequelize
  .authenticate()
  .catch((e: any) => console.error(`Unable to connect to the database${e}.`));

const modelsBuilder = (instance: Sequelize) => ({
  // Import models to sequelize
  Exercise: instance.import(path.join(__dirname, "exercise"), defineExercise),
  Program: instance.import(path.join(__dirname, "program"), defineProgram),
  User: instance.import(path.join(__dirname, "user"), defineUser),
  History: instance.import(path.join(__dirname, "history"), defineHistory),
});

const models = modelsBuilder(sequelize);

// check if every model is imported
const modelsFiles = fs.readdirSync(__dirname);
// -1 because index.ts can not be counted
if (Object.keys(models).length !== modelsFiles.length - 1) {
  throw new Error("You probably forgot import database model!");
}

Object.values(models).forEach((value: any) => {
  if (value.associate) {
    value.associate(models);
  }
});

export { models, modelsBuilder, sequelize };
