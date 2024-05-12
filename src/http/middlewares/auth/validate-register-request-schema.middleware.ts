import { NextFunction, Request, Response } from "express";
import { formatZodErrors } from "../../../_lib";
import { HTTP_CODE_CLIENT_ERROR, HTTP_MESSAGES } from "../../../constants";
import { RegisterRequestSchema } from "../../../schemas";



export const validateRegisterSchema = (req: Request, res: Response, next: NextFunction) => {

    const { success, error } = RegisterRequestSchema.safeParse(req.body);
    
    if (!success) {
        return res.status(HTTP_CODE_CLIENT_ERROR).json({
            ok: false,
            message: HTTP_MESSAGES[HTTP_CODE_CLIENT_ERROR],
            data: null,
            errors: formatZodErrors(error)
        });
    }

    next();
}