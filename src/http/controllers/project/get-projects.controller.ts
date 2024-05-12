import { Request, Response } from "express";
import { BaseController, simpleLogger } from "../../../_lib";
import { HTTP_CODE_OK, HTTP_MESSAGES } from "../../../constants";
import { ProjectService } from "../../services";



export class GetProjectsController extends BaseController {

    constructor(private _ps: ProjectService) {
        super();
    }

    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const user = JSON.parse(req.headers.decoded as string);

            const allProjects = await this._ps.getAllProjects();
            const projects = this._ps.getProjectsById(user, allProjects);

            this.jsonResponse(res, {
                code: HTTP_CODE_OK, response: {
                    ok: true,
                    messages: HTTP_MESSAGES[HTTP_CODE_OK],
                    projects
                }
            });

        } catch (error) {
            simpleLogger(error, GetProjectsController.name);
            this.jsonResponse(res, this.serverErrorResponse);
        }
    }
}