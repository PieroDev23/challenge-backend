import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController, simpleLogger } from "../../../_lib";
import { HTTP_CODE_CLIENT_ERROR, HTTP_CODE_OK, HTTP_MESSAGES } from "../../../constants";
import { TaskService } from "../../services";




export class GetTaskInfoController extends BaseController {

    constructor(private _ts: TaskService) {
        super();
    }

    protected async response(req: Request, res: Response): Promise<any> {
        try {

            const idTask = req.params.idTask;

            const taskFinded = await this._ts.findTaskById(idTask);

            if (!taskFinded) {
                return this.jsonResponse(res, {
                    code: HTTP_CODE_CLIENT_ERROR,
                    response: {
                        ok: false,
                        message: HTTP_MESSAGES[HTTP_CODE_CLIENT_ERROR],
                        task: null
                    }
                })
            }

            const task = this._ts.formatTask(taskFinded);

            this.jsonResponse(res, {
                code: HTTP_CODE_OK,
                response: {
                    ok: true,
                    message: HTTP_MESSAGES[HTTP_CODE_OK],
                    task
                }
            })


        } catch (error) {
            simpleLogger(error, GetTaskInfoController.name);
            this.jsonResponse(res, this.serverErrorResponse);
        }
    }

}