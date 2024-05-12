import { BaseRouter } from "../../_lib";
import { CreateTaskController, UpdateTaskController } from "../controllers";
import { validateCreateTaskRequestSchema, validateJWT, validateUpdateTaskSchema, validateUserAdminRole } from "../middlewares";
import { ProjectService, TaskService, UserService } from "../services";

export class TaskRouter extends BaseRouter {
    public path: string = 'task';

    constructor() {
        super();

        this.routes = [
            {
                path: 'create',
                method: 'post',
                controller: CreateTaskController,
                middlewares: [
                    validateJWT,
                    validateUserAdminRole,
                    validateCreateTaskRequestSchema
                ],
                services: [
                    UserService,
                    TaskService,
                    ProjectService
                ]
            },
            {
                path: 'update/:idTask',
                method: 'put',
                controller: UpdateTaskController,
                middlewares: [
                    validateJWT,
                    validateUpdateTaskSchema
                ],
                services: [TaskService]
            },

        ];
    }
}