import { Request, Response } from "express";
import { BaseController, simpleLogger } from "../../../_lib";
import { ProjectService } from "../../services";
import { HTTP_CODE_OK, HTTP_MESSAGES } from "../../../constants";



export class GetProjectTasksController extends BaseController {

    constructor(private _ps: ProjectService) {
        super();
    }

    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const idProject = req.params.idProject;
            const tasks = await this._ps.getProjectTasks(idProject);

            if (tasks.length === 0) {
                return this.jsonResponse(res, {
                    code: HTTP_CODE_OK,
                    response: {
                        ok: true,
                        message: HTTP_MESSAGES[HTTP_CODE_OK],
                        data: []
                    }
                });
            }

            this.jsonResponse(res, {
                code: HTTP_CODE_OK,
                response: {
                    ok: true,
                    message: HTTP_MESSAGES[HTTP_CODE_OK],
                    tasks
                }
            });

        } catch (error) {
            simpleLogger(error, GetProjectTasksController.name)
            this.jsonResponse(res, this.serverErrorResponse);
        }
    }

}