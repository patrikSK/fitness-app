import http from "http";
import express from "express";
import { sequelize } from "./db";
import passport from "passport";
import passportConfig from "./config/passport";

import ProgramRouter from "./routes/programs";
import HistoryRouter from "./routes/history";
import ExerciseRouter from "./routes/exercises";
import UserRouter from "./routes/user";
import auth from "./routes/auth";
import cors from "cors";
const app = express();

passportConfig(passport);
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/programs", ProgramRouter());
app.use("/exercises", ExerciseRouter());
app.use("/users", UserRouter());
app.use("/history", HistoryRouter());
app.use("/auth", auth());

const httpServer = http.createServer(app);

sequelize.sync();

console.log("Sync database", "postgresql://localhost:5432/fitness_app");

httpServer
  .listen(8000)
  .on("listening", () => console.log(`Server started at port ${8000}`));

export default httpServer;
