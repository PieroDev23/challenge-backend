import { z } from "zod";
import { BaseController, TypedRequest, TypedResponse, simpleLogger } from "../../../_lib";
import { BAD_CREDENTALS_MESSAGE, HTTP_CODE_OK, HTTP_CODE_UNAUTHORIZE, HTTP_MESSAGES } from "../../../constants";
import { User } from "../../../database";
import { LoginRequestSchema } from "../../../schemas";
import { AuthService, JWTService } from "../../services";


/**
 * @type
 * Type of the Body coming from the frontend
 */
export type LoginRequest = z.infer<typeof LoginRequestSchema>

/**
 * @type
 * Type of the response that we return
 */
export type LoginResponse = {
    data: {
        token: string;
        user: Omit<User, 'createdAt' | 'updatedAt' | 'hashPassword' | 'password'>
    } | null
}
export class LoginController extends BaseController {


    constructor(
        private _as: AuthService,
        private _jwts: JWTService,
    ) {
        super();
    }

    protected async response(req: TypedRequest<LoginRequest>, res: TypedResponse<LoginResponse>) {
        try {
            const { password, email } = req.body;
           
            const user = await this._as.verifyUserEmail(email);

            if (!user) {
                return this.jsonResponse(res, {
                    code: HTTP_CODE_UNAUTHORIZE,
                    response: {
                        ok: false,
                        message: BAD_CREDENTALS_MESSAGE,
                        data: null
                    }
                })
            }

            const { createdAt, updatedAt, password: userPassword, ...restUser } = user;

            const passwordMatch = this._as.comparePasswords(password, userPassword);
            if (!passwordMatch) {
                return this.jsonResponse(res, {
                    code: HTTP_CODE_UNAUTHORIZE,
                    response: {
                        ok: false,
                        message: BAD_CREDENTALS_MESSAGE,
                        data: null
                    }
                });
            }

            const token = this._jwts.genJWT(user);

            return this.jsonResponse(res, {
                code: HTTP_CODE_OK,
                response: {
                    ok: true,
                    message: HTTP_MESSAGES[HTTP_CODE_OK],
                    data: {
                        token,
                        user: restUser
                    }
                }
            });

        } catch (error) {
            this.jsonResponse(res, this.serverErrorResponse);
            simpleLogger(error, LoginController.name);
        }
    }

}