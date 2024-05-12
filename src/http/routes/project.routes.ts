import { BaseRouter } from "../../_lib";
import { PROJECT_PATH } from "../../constants";
import { CreateProjectController } from "../controllers";
import { validateCreateProjectSchema, validateJWT, validateUserAdminRole } from "../middlewares";
import { ProjectService, UserService } from "../services";



export class ProjectRouter extends BaseRouter {
    public path: string = PROJECT_PATH;

    constructor() {
        super();

        this.routes = [
            {
                path: 'create',
                method: 'post',
                controller: CreateProjectController,
                middlewares: [validateCreateProjectSchema, validateJWT, validateUserAdminRole],
                services: [UserService, ProjectService]
            }
        ];
    }
}