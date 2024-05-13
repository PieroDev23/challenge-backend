import { Request, Response } from "express";
import { BaseController, simpleLogger } from "../../../_lib";
import { HTTP_CODE_OK, HTTP_MESSAGES } from "../../../constants";
import { UserService } from "../../services";




export class GetAllUsersController extends BaseController {

    constructor(private _us: UserService) {
        super();
    }

    protected async response(req: Request, res: Response): Promise<any> {
        try {

            const users = await this._us.getAllUsers();
            this.jsonResponse(res, {
                code: HTTP_CODE_OK, response: {
                    ok: true,
                    message: HTTP_MESSAGES[HTTP_CODE_OK],
                    users
                }
            })

        } catch (error) {
            simpleLogger(error, GetAllUsersController.name);
        }
    }


}