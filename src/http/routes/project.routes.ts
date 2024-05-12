import { BaseRouter } from "../../_lib";
import { PROJECT_PATH } from "../../constants";
import { CreateProjectController, GetProjectTasksController, GetProjectsController } from "../controllers";
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
            },
            {
                path: 'get-all',
                method: 'get',
                controller: GetProjectsController,
                middlewares: [validateJWT],
                services: [ProjectService],
            },
            {
                path: ':idProject/tasks',
                method: 'get',
                controller: GetProjectTasksController,
                middlewares: [validateJWT],
                services: [ProjectService]
            }
        ];
    }
}