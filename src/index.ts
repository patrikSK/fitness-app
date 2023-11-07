import * as dotEnv from "dotenv";
dotEnv.config();
import http from "http";
import express from "express";
import { sequelize } from "./db";
import passport from "passport";
import passportConfig from "./config/passport";

import BodyPartRouter from "./routes/bodyPart";
import HistoryRouter from "./routes/history";
import ExerciseRouter from "./routes/exercises";
import UserRouter from "./routes/user";
import auth from "./routes/auth";
import workout from "./routes/workout";

import cors from "cors";
const app = express();

// enable cors
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
    exposedHeaders: "*",
  })
);

passportConfig(passport);
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use("/bodyParts", BodyPartRouter());
app.use("/exercises", ExerciseRouter());
app.use("/users", UserRouter());
app.use("/history", HistoryRouter());
app.use("/auth", auth());
app.use("/workouts", workout());

const httpServer = http.createServer(app);

sequelize.sync();

httpServer
  .listen(process.env.PORT)
  .on("listening", () => console.log(`Server started at port ${process.env.PORT}`));

export default httpServer;
