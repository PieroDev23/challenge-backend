import { BaseRouter } from "../../_lib";
import { AUTH_PATH } from "../../constants";
import { LoginController, RegisterController } from "../controllers";
import { validateLoginSchema, validateRegisterSchema } from "../middlewares";
import { AuthService, JWTService } from "../services";


export class AuthRouter extends BaseRouter {

    public path: string = AUTH_PATH;

    constructor() {
        super();

        this.routes = [
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