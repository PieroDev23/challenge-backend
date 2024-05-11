import express, { Request, Response } from "express";
import { HTTP_CODE_SERVER_ERROR, HTTP_MESSAGES } from "../../constants";
import { TypedResponse } from "../_types.lib";


/**
 * @abstract
 * @class
 * Base model for my subclasess controllers
 */
export abstract class BaseController {

    /**
     * @abstract
     * @method
     * Protected handler that would be implemented for my subclases this method allows me to
     * Encapsulate all the logic of my controller
     * @param req {express.Request} Express Request
     * @param res {express.Response} Express Response
     */
    protected abstract response(req: Request, res: Response): Promise<void | any>

    /**
     * Basic error response
     */
    protected serverErrorResponse = {
        code: HTTP_CODE_SERVER_ERROR,
        response: {
            message: HTTP_MESSAGES[HTTP_CODE_SERVER_ERROR],
            data: null
        }
    }

    /**
     * @method
     * Public handler method for executing the logic of my controller
     * @param req {express.Request} Express Request
     * @param res {express.Response} Express Response
     */
    public async execute(req: Request, res: Response): Promise<void> {
        try {
            this.response(req, res);
        } catch (error) {
            console.log('[BASE CONTROLLER] Uncaught controller error');
            console.log(error);
            this.jsonResponse(res, this.serverErrorResponse);
        }
    }

    /**
     * @method
     * Allow to emit a JSON response to my client
     * @param res {TypedResponse<T>} response object customized from express
     * @param payload payload to send to the client
     */
    protected jsonResponse<T>(res: TypedResponse<T>, payload: { code: number; response: T }) {
        const { code, response } = payload;
        res.status(code).json(response);
    }

}