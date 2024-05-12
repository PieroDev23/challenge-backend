import { NextFunction, Request, Response } from "express";
import { USER_ROLES } from "../../../database";
import { HTTP_CODE_UNAUTHORIZE, HTTP_MESSAGES } from "../../../constants";




export const validateUserAdminRole = (req: Request, res: Response, next: NextFunction) => {
    const role = JSON.parse(req.headers.decoded as string).role;
    
    if (role !== USER_ROLES.ADMIN) {
        return res.status(HTTP_CODE_UNAUTHORIZE).json({
            ok: false,
            message: HTTP_MESSAGES[HTTP_CODE_UNAUTHORIZE],
            data: null,
        })
    }

    next();
}