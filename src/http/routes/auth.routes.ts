import { BaseRouter } from "../../_lib";
import { AUTH_PATH } from "../../constants";
import { RegisterController } from "../controllers";
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
                // middlewares: [loginMiddlware],
                services: [AuthService, JWTService]
            },
        ];
    }

}