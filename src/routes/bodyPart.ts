import {
  getBodyParts,
  createBodyPart,
  removeBodyPart,
} from "../controllers/bodyPartsController";
import { isAdmin, checkAuthenticated } from "../controllers/authController";
import { Router } from "express";

const router: Router = Router();

export default () =>
  router
    .get("/", getBodyParts)
    .post("/", checkAuthenticated, isAdmin, createBodyPart)
    .delete("/:id", checkAuthenticated, isAdmin, removeBodyPart);
