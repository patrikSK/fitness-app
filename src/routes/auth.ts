import { Router } from "express";
import handleRegister from "../controllers/registerController";
import handleLogin from "../controllers/loginController";
import cors from "cors";

const corsOptions = {
  origin: "https://my-fitness-app-api.onrender.com/auth/login",
  optionsSuccessStatus: 200,
};

const router: Router = Router();

export default () =>
  router.post("/login", cors(corsOptions), handleLogin).post("/register", handleRegister);
