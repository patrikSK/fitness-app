import { Request, Response } from "express";
import { models } from "../db";

const { Program } = models;

const getPrograms = async (_req: Request, res: Response) => {
    try {
        const programs = await Program.findAll();
        return res.status(200).json({
            success: true,
            data: programs,
            message: "List of programs",
        });
    } catch (err) {
        return res.json({ success: false, error: err });
    }
};

const createProgram = async (_req: Request, res: Response) => {
    try {
        const program = await Program.create({
            name: _req.body.name,
        });

        return res.status(200).json({
            success: true,
            program: program,
            message: "program was successfully created",
        });
    } catch (err) {
        return res.json({ success: false, error: err });
    }
};

const removeProgram = async (_req: Request, res: Response) => {
    const id = _req.params.id;
    try {
        await Program.destroy({
            where: {
                id: id,
            },
        });

        return res.status(200).json({
            success: true,
            message: "program was successfully removed",
        });
    } catch (err) {
        return res.json({ success: false, error: err });
    }
};

export { getPrograms, createProgram, removeProgram };
