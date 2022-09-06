import { Request, Response, NextFunction } from "express";
import { getIdFromToken } from "../utils/auth";
import { models } from "../db";
import passport from "passport";

const { User } = models;

const checkAuthenticated = (
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    passport.authenticate("jwt", function (err, user) {
        if (err) {
            console.log(err);
            return res
                .status(401)
                .json({ succes: false, code: "unauthorized" });
        }
        if (!user) {
            return res
                .status(401)
                .json({ succes: false, code: "unauthorized" });
        } else {
            return _next();
        }
    })(_req, res, _next);
};

const isAdmin = async (_req: Request, res: Response, _next: NextFunction) => {
    let id = getIdFromToken(_req.headers.authorization);
    try {
        const user = await User.findOne({
            where: { id: id },
        });

        if (user.role == "ADMIN") {
            return _next();
        } else {
            res.status(401).json({
                success: false,
                message: "you are authenticated, but not admin",
            });
        }
    } catch (err) {
        res.status(401).json({ success: false, error: err });
    }
};

export { checkAuthenticated, isAdmin };
