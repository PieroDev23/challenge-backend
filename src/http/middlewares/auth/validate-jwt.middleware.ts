import { NextFunction, Request, Response } from "express";
import { useService } from "../../../_lib";
import { JWTService } from "../../services";
import { HTTP_CODE_UNAUTHORIZE, HTTP_MESSAGES } from "../../../constants";




export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const _jwts = useService(JWTService);
    const token = req.headers.authorization?.split(" ").pop();

    if (!token) {
        return res.status(HTTP_CODE_UNAUTHORIZE).json({
            ok: false,
            message: HTTP_MESSAGES[HTTP_CODE_UNAUTHORIZE],
            data: null,
        });
    }

    _jwts.verifyJWT(token, (err, decoded) => {

        if (err) {
            console.log('llega aqui')
            return res.status(HTTP_CODE_UNAUTHORIZE).json({
                ok: false,
                message: HTTP_MESSAGES[HTTP_CODE_UNAUTHORIZE],
                data: null,
                errors: err
            });
        }

        req.headers.decoded = JSON.stringify(decoded);
        
        next();
    });


}