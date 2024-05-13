import { Request, Response } from "express";
import { BaseController, simpleLogger } from "../../../_lib";
import { ProjectService } from "../../services";
import { HTTP_CODE_CLIENT_ERROR, HTTP_CODE_OK, HTTP_MESSAGES } from "../../../constants";





export class GetProjectInfoController extends BaseController {

    constructor(private _ps: ProjectService) {
        super();
    }

    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const idProject = req.params.idProject;

            const projectFineded = await this._ps.findProjectById(idProject);

            if (!projectFineded) {
                return this.jsonResponse(res, {
                    code: HTTP_CODE_CLIENT_ERROR,
                    response: {
                        ok: false,
                        message: HTTP_MESSAGES[HTTP_CODE_CLIENT_ERROR],
                        project: null
                    }
                })
            }


            const project = this._ps.formatProject(projectFineded);

            this.jsonResponse(res, {
                code: HTTP_CODE_OK,
                response: {
                    ok: true,
                    message: HTTP_MESSAGES[HTTP_CODE_OK],
                    project
                }
            })

        } catch (error) {
            simpleLogger(error, GetProjectInfoController.name);
            this.jsonResponse(res, this.serverErrorResponse);
        }
    }

}

