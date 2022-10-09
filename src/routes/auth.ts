import { Router } from "express";
import handleRegister from "../controllers/registerController";
import handleLogin from "../controllers/loginController";
import cors from "cors";

const corsOptions = {
  origin: "https://fitness-app-luv3.onrender.com",
  optionsSuccessStatus: 200,
  credentials: true,
};

const router: Router = Router();

export default () =>
  router.post("/login", cors(corsOptions), handleLogin).post("/register", handleRegister);
