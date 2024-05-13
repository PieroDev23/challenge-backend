import { Response } from "express";
import { z } from "zod";
import { BaseController, TypedRequest, simpleLogger } from "../../../_lib";
import { CreateTaskRequestSchema } from "../../../schemas";
import { ProjectService, UserService } from "../../services";
import { TaskService } from "../../services/task";
import { HTTP_CODE_CLIENT_ERROR, HTTP_CODE_OK, HTTP_MESSAGES } from "../../../constants";

export type CreateTaskRequest = z.infer<typeof CreateTaskRequestSchema>


export class CreateTaskController extends BaseController {

    constructor(private _us: UserService, private _ts: TaskService, private _ps: ProjectService) {
        super();
    }

    protected async response(req: TypedRequest<CreateTaskRequest>, res: Response): Promise<any> {
        try {
            const { iat, exp, updatedAt, createdAt, password, ...manager } = JSON.parse(req.headers.decoded as string);
            const body = req.body;

            const asignees = await this._us.findUsersById(body.asignees);

            if (asignees.length === 0) {
                return this.jsonResponse(res, {
                    code: HTTP_CODE_CLIENT_ERROR,
                    response: {
                        ok: false,
                        message: HTTP_MESSAGES[HTTP_CODE_CLIENT_ERROR],
                        data: null
                    }
                })
            }
            
            const project = await this._ps.findProjectById(body.idProject);

            if (!project) {
                return this.jsonResponse(res, {
                    code: HTTP_CODE_CLIENT_ERROR,
                    response: {
                        ok: false,
                        message: HTTP_MESSAGES[HTTP_CODE_CLIENT_ERROR],
                        data: null
                    }
                })
            }

            // create the task
            const task = await this._ts.createTask({
                title: body.title,
                description: body.description,
                asignees,
                project
            });

            const newTask = {
                ...task,
                asignedBy: manager,
                asignees: this._us.formatUsers(asignees)
            }

            this.jsonResponse(res, {
                code: HTTP_CODE_OK,
                response: {
                    ok: true,
                    message: HTTP_MESSAGES[HTTP_CODE_OK],
                    data: newTask
                }
            })

        } catch (error) {
            this.jsonResponse(res, this.serverErrorResponse);
            simpleLogger(error, CreateTaskController.name);
        }
    }

}