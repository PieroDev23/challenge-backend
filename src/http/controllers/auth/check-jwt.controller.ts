import { Request, Response } from "express";
import { BaseController, simpleLogger } from "../../../_lib";
import { JWTService } from "../../services";
import { HTTP_CODE_CLIENT_ERROR, HTTP_CODE_OK, HTTP_CODE_UNAUTHORIZE, HTTP_MESSAGES } from "../../../constants";

export class CheckJWTController extends BaseController {

    constructor(private _jwts: JWTService) {
        super();
    }

    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const token = req.headers.authorization?.split(" ").pop();

            if (!token) {
                return this.jsonResponse(res, {
                    code: HTTP_CODE_CLIENT_ERROR,
                    response: {
                        ok: false,
                        message: HTTP_MESSAGES[HTTP_CODE_CLIENT_ERROR],
                        data: null
                    }
                });
            }

            this._jwts.verifyJWT(token, (err, decoded) => {
                if (err) {
                    return this.jsonResponse(res, {
                        code: HTTP_CODE_UNAUTHORIZE,
                        response: {
                            ok: false,
                            message: HTTP_MESSAGES[HTTP_CODE_UNAUTHORIZE],
                            data: null,
                            errors: err
                        }
                    });
                }

                this.jsonResponse(res, {
                    code: HTTP_CODE_OK,
                    response: {
                        ok: true,
                        message: HTTP_MESSAGES[HTTP_CODE_OK],
                        data: decoded,
                    }
                });
            });

        } catch (error) {
            simpleLogger(error, CheckJWTController.name);
        }
    }
}