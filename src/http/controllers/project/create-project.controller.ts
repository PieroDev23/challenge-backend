import { z } from "zod";
import { BaseController, TypedRequest, TypedResponse, simpleLogger } from "../../../_lib";
import { HTTP_CODE_CLIENT_ERROR, HTTP_CODE_OK, HTTP_MESSAGES, NOT_ENOUGH_MEMBERS_ON_PROJECT_MESSAGE } from "../../../constants";
import { CreateProjectRequestSchema } from "../../../schemas";
import { ProjectService, UserService } from "../../services";
import { ProjectFormatted } from "../../services/project/project.service";


export type CreateProjectRequest = z.infer<typeof CreateProjectRequestSchema>;


export type CreateProjectResponse = {
    data: {
        [key: string]: any
        project: ProjectFormatted
    } | null
}

export class CreateProjectController extends BaseController {

    constructor(
        private _us: UserService,
        private _ps: ProjectService
    ) {
        super();
    }

    protected async response(req: TypedRequest<CreateProjectRequest>, res: TypedResponse<CreateProjectResponse>): Promise<any> {
        try {

            const body = req.body;

            // getting the manager from the JWT decoded
            const manager = JSON.parse(req.headers.decoded as string);

            // requesting the members for the project
            const members = await this._us.findUsersById([...body.consumersIds, manager.userId]);

            // if there is no members throw an exception
            if (members.length <= 1) {
                return this.jsonResponse(res, {
                    code: HTTP_CODE_CLIENT_ERROR,
                    response: {
                        ok: false,
                        message: NOT_ENOUGH_MEMBERS_ON_PROJECT_MESSAGE,
                        data: null
                    }
                });
            }

            // preparing for creating the project
            const newProject = { members, name: body.titleProject, createdBy: manager.userId };

            // creating the project and saving it
            const project = await this._ps.createProject(newProject);

            if (!project) {
                return this.jsonResponse(res, this.serverErrorResponse);
            }

            // processing the project members
            const projectFormatted = this._ps.formatProject(project);
            
            this.jsonResponse(res, {
                code: HTTP_CODE_OK,
                response: {
                    ok: true,
                    message: HTTP_MESSAGES[HTTP_CODE_OK],
                    data: {
                        createdBy: this._ps.findAdminOnProject(projectFormatted),
                        project: projectFormatted,
                    },
                }
            });

        } catch (error) {
            simpleLogger(error, CreateProjectController.name);
            this.jsonResponse(res, this.serverErrorResponse);
        }

    }
}