import { NextFunction, Request, Response } from "express";
import { parseZodSchema } from "../../../_lib";
import { UpdateTaskRequestSchema } from "../../../schemas";
import { HTTP_CODE_CLIENT_ERROR } from "../../../constants";



export const validateUpdateTaskSchema = (req: Request, res: Response, next: NextFunction) => {
    const errors = parseZodSchema(UpdateTaskRequestSchema, req.body);

    if (errors) {
        return res.status(HTTP_CODE_CLIENT_ERROR).json(errors);
    }

    next();
}