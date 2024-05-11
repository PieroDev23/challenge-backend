import { BaseController, TypedRequest, TypedResponse, simpleLogger } from "../../../_lib";
import { EMAIL_ALREADY_EXISTS_MESSAGE, HTTP_CODE_CLIENT_ERROR, HTTP_CODE_OK, HTTP_MESSAGES } from "../../../constants";
import { USER_ROLES, User } from "../../../database";
import { AuthService, JWTService } from "../../services/auth";


/**
 * @type
 * Type of the Body coming from the frontend
 */
export type RegisterRequest = {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    role: USER_ROLES
}

/**
 * @type
 * Type of the response that we return
 */
export type RegisterResponse = {
    data: {
        token: string;
        user: Omit<User, 'createdAt' | 'updatedAt' | 'hashPassword'>
    } | null
}

export class RegisterController extends BaseController {

    constructor(private _as: AuthService, private _jwt: JWTService) {
        super();
    }

    protected async response(req: TypedRequest<RegisterRequest>, res: TypedResponse<RegisterResponse>): Promise<any> {
        try {
            const userRequestBody = req.body;
            const user = await this._as.verifyUserEmail(userRequestBody.email);

            if (user) {
                return this.jsonResponse(res, {
                    code: HTTP_CODE_CLIENT_ERROR,
                    response: {
                        ok: false,
                        message: EMAIL_ALREADY_EXISTS_MESSAGE,
                        data: null
                    }
                });
            }

            const newUser = await this._as.registerUser(userRequestBody);

            if (!newUser) {
                return this.jsonResponse(res, this.serverErrorResponse);
            }

            const { createdAt, updatedAt, ...rest } = newUser;

            const jwt = this._jwt.genJWT(user);

            this.jsonResponse(res, {
                code: HTTP_CODE_OK,
                response: {
                    ok: true,
                    message: HTTP_MESSAGES[HTTP_CODE_OK],
                    data: {
                        token: jwt,
                        user: rest
                    }
                }
            });

        } catch (error) {
            this.jsonResponse(res, this.serverErrorResponse);
            simpleLogger(error, RegisterController.name);
        }
    }

}

