import { NextFunction, Request, Response } from "express";
import { parseZodSchema } from "../../../_lib";
import { HTTP_CODE_CLIENT_ERROR } from "../../../constants";
import { LoginRequestSchema } from "../../../schemas";




export const validateLoginSchema = (req: Request, res: Response, next: NextFunction) => {

    const errors = parseZodSchema(LoginRequestSchema, req.body);

    if (errors) {
        return res.status(HTTP_CODE_CLIENT_ERROR).json(errors)
    }

    next();
}