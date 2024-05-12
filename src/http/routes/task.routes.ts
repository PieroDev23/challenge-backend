import { BaseRouter } from "../../_lib";
import { CreateTaskController, UpdateTaskController } from "../controllers";
import { validateJWT, validateUserAdminRole, validateCreateTaskRequestSchema, validateUpdateTaskSchema } from "../middlewares";
import { UserService, TaskService, ProjectService } from "../services";


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
                services: [UserService, TaskService, ProjectService]
            },
            {
                path: 'update/:id',
                method: 'put',
                controller: UpdateTaskController,
                middlewares: [validateUpdateTaskSchema],
                services: [TaskService]
            }
        ];
    }
}