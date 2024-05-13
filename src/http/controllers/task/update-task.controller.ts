import { Response } from "express";
import { z } from "zod";
import { BaseController, TypedRequest, simpleLogger } from "../../../_lib";
import { HTTP_CODE_CLIENT_ERROR, HTTP_CODE_OK, HTTP_MESSAGES } from "../../../constants";
import { UpdateTaskRequestSchema } from "../../../schemas";
import { TaskService } from "../../services";


export type UpdateTaskRequest = z.infer<typeof UpdateTaskRequestSchema>;

export class UpdateTaskController extends BaseController {

    constructor(private _ts: TaskService) {
        super();
    }

    protected async response(req: TypedRequest<UpdateTaskRequest>, res: Response): Promise<any> {

        try {
            const idTask = req.params.idTask;
            // search the task and updated it
            const task = await this._ts.findTaskById(idTask);

            if (!task) {
                return this.jsonResponse(res, {
                    code: HTTP_CODE_CLIENT_ERROR,
                    response: {
                        message: HTTP_MESSAGES[HTTP_CODE_CLIENT_ERROR],
                        data: null,
                    }
                })
            }

            // updating the status
            const taskUpdated = await this._ts.updateStatus(task, req.body.status);

            // if the task updated is null thow an exception
            if (!taskUpdated) {
                return this.jsonResponse(res, this.serverErrorResponse);
            }

            this.jsonResponse(res, {
                code: HTTP_CODE_OK,
                response: {
                    message: HTTP_MESSAGES[HTTP_CODE_OK],
                    data: {
                        idProject: req.body.idProject,
                        ...this._ts.formatTask(taskUpdated)
                    }
                }
            });

        } catch (error) {
            simpleLogger(error, UpdateTaskController.name);
            this.jsonResponse(res, this.serverErrorResponse);
        }

    }

}