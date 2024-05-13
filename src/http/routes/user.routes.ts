import { BaseRouter } from "../../_lib";
import { GetAllUsersController } from "../controllers/user";
import { validateJWT } from "../middlewares";
import { UserService } from "../services";




export class UserRouter extends BaseRouter {
    path: string = 'user'

    constructor() {
        super();

        this.routes = [
            {
                path: 'get-all',
                method: 'get',
                controller: GetAllUsersController,
                middlewares: [validateJWT],
                services: [UserService],
            }
        ]
    }
}