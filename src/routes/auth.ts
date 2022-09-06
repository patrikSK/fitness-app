import { Router } from "express";
import handleRegister from "../controllers/registerController";
import handleLogin from "../controllers/loginController";

const router: Router = Router();

router.post("/login", handleLogin);
router.post("/register", handleRegister);

export default router;
