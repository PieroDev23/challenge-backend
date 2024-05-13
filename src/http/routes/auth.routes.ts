import { BaseRouter } from "../../_lib";
import { AUTH_PATH } from "../../constants";
import { CheckJWTController, LoginController, RegisterController } from "../controllers";
import { validateLoginSchema, validateRegisterSchema } from "../middlewares";
import { AuthService, JWTService } from "../services";


export class AuthRouter extends BaseRouter {

    public path: string = AUTH_PATH;

    constructor() {
        super();

        this.routes = [
            {
                path: 'check-token',
                method: 'get',
                controller: CheckJWTController,
                services: [JWTService]
            },
            {
                path: 'register',
                method: 'post',
                controller: RegisterController,
                middlewares: [validateRegisterSchema],
                services: [AuthService, JWTService]
            },
            {
                path: 'login',
                method: 'post',
                controller: LoginController,
                middlewares: [validateLoginSchema],
                services: [AuthService, JWTService]
            }
        ];
    }

}