import { BaseController, TypedRequest, TypedResponse } from "../../../_lib";
import { BAD_CREDENTALS_MESSAGE, HTTP_CODE_OK, HTTP_CODE_UNAUTHORIZE, HTTP_MESSAGES } from "../../../constants";
import { User } from "../../../database";
import { AuthService, JWTService } from "../../services";
import { RegisterController } from "./register.controller";


/**
 * @type
 * Type of the Body coming from the frontend
 */
export type LoginRequest = {
    email: string;
    password: string;
}

/**
 * @type
 * Type of the response that we return
 */
export type LoginResponse = {
    data: {
        token: string;
        user: Omit<User, 'createdAt' | 'updatedAt' | 'hashPassword'>
    } | null
}
export class LoginController extends BaseController {


    constructor(
        private _jwts: JWTService,
        private _as: AuthService
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

            const { createdAt, updatedAt, ...restUser } = user;

            const passwordMatch = this._as.comparePasswords(password, user.password);
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
            // console.log(`[Error Ocurring on ${LoginController.name} (ERROR NAME: ${name})]: ${message}`);
            if (error instanceof Error) {
                console.log(`[Error on ${RegisterController.name} ${error.name}]: `);
                console.log(error.message);
            }
        }
    }

}