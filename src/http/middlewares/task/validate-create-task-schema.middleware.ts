import { HTTP_CODE_CLIENT_ERROR } from './../../../constants/index';
import { Request, Response, NextFunction } from "express"
import { parseZodSchema } from "../../../_lib"
import { CreateTaskRequestSchema } from "../../../schemas"



export const validateCreateTaskRequestSchema = (req: Request, res: Response, next: NextFunction) => {

    const error = parseZodSchema(CreateTaskRequestSchema, req.body);

    if (error) {
        return res.status(HTTP_CODE_CLIENT_ERROR).json(error);
    }

    next();
}