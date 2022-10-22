import { Router } from "express";
import handleRegister from "../controllers/registerController";
import handleLogin from "../controllers/loginController";

const router: Router = Router();

export default () => router.post("/login", handleLogin).post("/register", handleRegister);
